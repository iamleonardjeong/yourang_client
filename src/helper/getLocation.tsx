import axios from "axios";
const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;

export const getLocation = async (
  place: any = "프라하",
  placeType: string = "tourist_attraction"
) => {
  const currentLocation = place;
  let latLng: any;
  let placeInfo: any;
  await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`
    )
    .then((response) => {
      latLng = response.data.results[0].geometry.location;
      return latLng;
    })
    .then(async (latLng) => {
      // 추천장소 카테고리 선택에 따라 서버로 보낼 장소 카테고리를 정하는 로직
      await axios
        .post("http://yourang-server.link:5000/google/map", {
          data: latLng,
          withCredentials: true,
          placeType: placeType,
        })
        .then(async (res) => {
          placeInfo = res.data.slice(0, 10); //응답받은 장소들

          const placeIds: any = [];
          placeInfo.forEach((place: any) => {
            if (place.photos !== undefined) {
              placeIds.push(place.place_id);
            }
          });

          await axios
            .post("http://yourang-server.link:5000/google/places_photo", {
              place_ids: placeIds,
              withCredentials: true,
            })
            .then((res) => {
              placeInfo = res.data;
              // 다음 페이지로 이동
              //   history.push('/main', { latLng, placeInfo, placeInput });
            });
        });
    });
  return { latLng, placeInfo, currentLocation };
};
