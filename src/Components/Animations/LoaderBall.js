import React from 'react'

export const LoaderBall = (props) => {

    const { stylesP } =  props;
    return (
    <div className="container-balls" style={stylesP}>
      <div className="ball ball-one" />
      <div className="ball ball-two" />
      <div className="ball ball-three" />
      <div className="ball ball-four" />
      <div className="shadow shadow-one" />
      <div className="shadow shadow-two" />
      <div className="shadow shadow-three" />
      <div className="shadow shadow-four" />
    </div>
    )
}
