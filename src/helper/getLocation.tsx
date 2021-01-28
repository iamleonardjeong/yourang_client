import axios from 'axios';
const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;

export const getLocation = async (place: any) => {
  const placeInput = place;
  let latLng: any;
  let places: any;
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
      console.log('좌표', latLng);
      await axios
        .post('https://localhost:5001/google/map', {
          data: latLng,
          withCredentials: true,
          placeType: { tourist_attraction: 'tourist_attraction' },
        })
        .then(async (res) => {
          places = res.data.slice(0, 3); //응답받은 장소들
          const placeIds: any = [];
          places.forEach((place: any) => {
            if (place.photos !== undefined) {
              placeIds.push(place.place_id);
            }
          });
          await axios
            .post('https://localhost:5001/google/places_photo', {
              place_ids: placeIds,
              withCredentials: true,
            })
            .then((res) => {
              places = res.data;
              console.log(places);
              // 다음 페이지로 이동
              //   history.push('/main', { latLng, places, placeInput });
            });
        });
    });
  return { latLng, places, placeInput };
};
