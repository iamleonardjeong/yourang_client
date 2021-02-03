import ReactDOMServer from 'react-dom/server';

export default function setMailStyle(myList: any) {
  // 메일 보내는 곳 인라인 Css스타일을 주기 위한 Css 스타일링 타입지정.
  const firstDiv = {
    fontSize: '20',
    fontFamily: 'Georgia',
  } as React.CSSProperties;

  const emailContentStyle = {
    fontSize: '25px',
    textDecoration: 'none',
  } as React.CSSProperties;

  const widthEighty = {
    margin: '0px',
    width: '80%',
  } as React.CSSProperties;

  const htmlString = ReactDOMServer.renderToStaticMarkup(
    <div>
      {myList.map((place: any) => {
        return (
          <div style={firstDiv}>
            <h1 style={firstDiv}>{place.title}</h1>
            <img src={place.imgSrc} alt="" />
            <h2>
              Address: <span style={emailContentStyle}>{place.address}</span>
            </h2>
            <h2>
              website: <span style={emailContentStyle}>{place.website}</span>
            </h2>
            <h2>
              Phone: <span style={emailContentStyle}>{place.phone}</span>
            </h2>
            <h2>
              Rate: <span style={emailContentStyle}>{place.desc}</span>
            </h2>
            <hr style={widthEighty} />
          </div>
        );
      })}
    </div>
  );

  return htmlString;
}
