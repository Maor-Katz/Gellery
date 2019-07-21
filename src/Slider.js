import React from 'react';


export class Slider extends React.Component {

    left = () => {
        const {currentImg, images} = this.props;
        if (images.length < 11) {
            const style = {left: ' 0px'};
            return style
        }
        else {
            const sliderWidth = (images.length * 75) + 6;
            const hiddenPixels = sliderWidth - 800 // 75px is 75px each of img+ margin, 6 its border, 35
            const square = currentImg / (images.length - 1);
            const toMove = hiddenPixels * square
            const style = {left: -toMove + 'px'};
            return style
        }
    }

    render() {
        const {images, currentImg, switchPic} = this.props;
        var leftStile = this.left()
        return (
            <div className="SliderComponent">
                <div className='slider' style={leftStile}>
                    {images.map((img, index) => {
                        return <img src={img}
                                    className={`imgSlider ${images[currentImg] === img ? 'currentSlider' : ''}`}
                                    onClick={(e) => switchPic(null, e)} key={index} alt="Smiley face"/>
                    })}
                </div>
            </div>
        );
    }
}

export default Slider