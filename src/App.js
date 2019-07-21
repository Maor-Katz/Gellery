import React, {Component} from 'react';
import './App.css';
import Slider from './Slider'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            wrapperObj: {
                0: {
                    style: {left: '-700px'},
                    src: '',
                },
                1: {
                    style: {left: '100px'},
                    src: '',
                },
                2: {
                    style: {left: '900px'},
                    src: '',
                },
            },
            currentImg: 1,
            currentObj: 1,
            next: 2,
            prev: 0,
            lockFunction: false,
        }
    }

    componentWillMount() {
        let {images} = this.state;
        for (var i = 1; i <= 15; i++) {
            let imageSrc = `/pics/gallery-image${i}.jpg`;
            images.push(imageSrc)
        }
        let wrapperObj = this.state.wrapperObj;
        wrapperObj[0].src = images[0];
        wrapperObj[1].src = images[1];
        wrapperObj[2].src = images[2];
        this.setState({images, wrapperObj});
        document.addEventListener('keydown', this.logKey);
    }

    logKey = (e) => {
        let {lockFunction} = this.state;
        if (!lockFunction) {
            if (e.code === 'ArrowRight')
                this.switchPic('right')
            if (e.code === 'ArrowLeft')
                this.switchPic('left')
        }
        this.setState({lockFunction: true})
    }
    switchFromSlider = (imgSrc) => {
        let {images} = this.state
        images.forEach((img, index) => {
            if (img === imgSrc) {
                this.setState({
                    currentObj: 1,
                    currentImg: index,
                    wrapperObj: {
                        0: {
                            style: {left: '-700px', transition: 'none'},
                            src: images[index - 1],
                        },
                        1: {
                            style: {left: '100px', transition: 'none'},
                            src: images[index],
                        },
                        2: {
                            style: {left: '900px', transition: 'none'},
                            src: images[index + 1],
                        }
                    }
                })
            }
        })
    }
    switchPic = (direction, event) => {
        if (direction === null) {
            const imgSrc = event.target.attributes.src.nodeValue;
            this.switchFromSlider(imgSrc)
            return
        }
        let {images, currentObj, wrapperObj, currentImg, prev, next} = this.state;
        if (direction === 'right') {
            currentObj = currentObj === 2 ? 0 : currentObj + 1;
            currentImg = currentImg === images.length - 1 ? 0 : currentImg + 1;
        }
        if (direction === 'left') {
            currentObj = currentObj === 0 ? 2 : currentObj - 1;
            currentImg = currentImg === 0 ? images.length - 1 : currentImg - 1;
        }
        switch (currentObj) {
            case 0:
                next = 1;
                prev = 2;
                break;
            case 1:
                next = 2;
                prev = 0;
                break;
            case 2:
                next = 0;
                prev = 1;
                break;
            default:
                break
        }
        if (direction === 'right') {
            wrapperObj[next].style = {transition: 'none'};
            wrapperObj[prev].style = {transition: '0.4s ease-out', transitionTimingFunction: 'linear'};
            wrapperObj[currentObj].style = {transition: '0.4s ease-out', transitionTimingFunction: 'linear'};
        }
        if (direction === 'left') {
            wrapperObj[prev].style = {transition: 'none'};//opacity:0
            wrapperObj[next].style = {transition: '0.4s ease-out', transitionTimingFunction: 'linear'};//opacity:1
            wrapperObj[currentObj].style = {transition: '0.4s ease-out', transitionTimingFunction: 'linear'};//opacity:1
        }
        wrapperObj[currentObj].src = images[currentImg];
        wrapperObj[currentObj].style.left = '100px';

        if (currentImg === 0) {
            wrapperObj[prev].src = images[images.length - 1];//new
            wrapperObj[next].src = images[currentImg + 1];//new
        }
        else if (currentImg === images.length - 1) {
            wrapperObj[prev].src = images[currentImg - 1];//new
            wrapperObj[next].src = images[0];//new
        }
        else {
            wrapperObj[prev].src = images[currentImg - 1];//new
            wrapperObj[next].src = images[currentImg + 1];//new
        }

        wrapperObj[next].style.left = '900px';
        wrapperObj[prev].style.left = '-700px';
        this.setState({currentObj, wrapperObj, currentImg, next, prev, lockFunction: true});
        setTimeout(
            () => this.setState({lockFunction: false})
            , 150);
    }

    render() {
        const {wrapperObj, images, currentImg} = this.state;
        library.add(faChevronLeft, faChevronRight);
        return (
            <div className="App">
                <h1 className='title'>Gallery</h1>
                <div className='gallery'>
                    <div className='imageWrapper'>
                        <div className='leftPicGallery' style={wrapperObj[0].style}>{<img className='imageGallery'
                                                                                          src={wrapperObj[0].src}
                                                                                          alt="Smiley face"/>} </div>
                        <div className='mainPic' style={wrapperObj[1].style}>{<img src={wrapperObj[1].src}
                                                                                   className='imageGallery'
                                                                                   alt="Smiley face"/>}</div>
                        <div className='rightPicGallery' style={wrapperObj[2].style}>{<img src={wrapperObj[2].src}
                                                                                           className='imageGallery'
                                                                                           alt="Smiley face"/>}</div>
                        <div className='arrowLeft' onClick={() => this.switchPic('left')}><FontAwesomeIcon
                            icon="chevron-left"/></div>
                        <div className='arrowRight' onClick={() => this.switchPic('right')}><FontAwesomeIcon
                            icon="chevron-right"/></div>
                    </div>
                    <Slider images={images} currentImg={currentImg} switchPic={this.switchPic}/>
                </div>
            </div>
        );
    }
}

export default App