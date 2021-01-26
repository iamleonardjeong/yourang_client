import React, { ChangeEvent, FormEvent, useState } from 'react';
import '../styles/Navigation.scss';
import { Link } from 'react-router-dom';

import axios from 'axios';

const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;
// const history = useHistory();

interface NavigationProps {
  submit: (form: { data: string; foo: string }) => void;
}

// const getLocation = (place: any) => {
//   let latLng;
//   console.log('Home페이지 26번째 줄', place);
//   axios
//     .get(
//       `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`
//     )
//     .then((response) => {
//       latLng = response.data.results[0].geometry.location;
//       setPlaceInput(latLng);
//       return latLng;
//     })
//     .then((latLng) => {
//       console.log('좌표받기 성공', latLng);
//       // 추천장소 카테고리 선택에 따라 서버로 보낼 장소 카테고리를 정하는 로직
//       axios
//         .post('https://localhost:5001/google/map', {
//           data: latLng,
//           withCredentials: true,
//           placeType: 'place',
//         })
//         .then((res) => {
//           console.log('nearby search 응답', res);
//           let places = res.data.slice(0, 3); //응답받은 장소들
//           const placeIds = places.map((placeId: any) => {
//             return placeId.place_id;
//           });

//           axios
//             .post('https://localhost:5001/google/places_photo', {
//               placeIds: placeIds,
//               withCredentials: true,
//             })
//             .then((res) => {
//               console.log('사진 URL 응답', res.data.data);
//               for (let i = 0; i < places.length; i++) {
//                 places[i].photo_url = res.data.data[i];
//               }
//               // 다음 페이지로 이동
//               history.push('/main', { latLng, places });
//             });
//         });
//     });
// };

function Navigation({ submit }: NavigationProps) {
  const [value, setValue] = useState({
    data: '',
    foo: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      data: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    let data;
    e.preventDefault();
    submit(value);
    async function foo() {
      data = axios
        .get(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${apiKey}`
          // `https://maps.googleapis.com/maps/api/geocode/json?address=${value.data}&key=${apiKey}`
        )
        .then(console.log);
    }
    foo();
  };

  return (
    <header>
      <div id="logo">
        <Link to="/main">YouRang</Link>
      </div>
      <div id="navSearch">
        <form onSubmit={handleSubmit}>
          <input
            onChange={onChange}
            value={value.data}
            type="text"
            placeholder="지역, 숙소명을 입력하세요"
            autoComplete="off"
          />
        </form>
      </div>
      <div id="navMenus">
        <div id="navProfile">
          <Link to="/main">Home</Link>
        </div>
        <div id="navProfile">Help</div>
        <div id="navProfile">
          <Link to="/main/profile">Profile</Link>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
