import SliderComp from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PhotoSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <div className="my-4">
      <SliderComp {...settings}>
      <div className="flex justify-center items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWXN8dFH-M1nWVld-fcF2vIQ5mbh_qlAy7RQ&s"
          alt=""
          className="w-[600px] mx-auto"
        />
      </div>
      <div className="flex justify-center items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRiOMflwfa30rRLkkUygWv8veJXwIYn7-8Pw&s"
          alt=""
          className="w-[600px] mx-auto"
        />
      </div>
      <div className="flex justify-center items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7KoWTRRHsDqXrnuh0l2him2t62zqMIeqjiA&s"
          alt=""
          className="w-[600px] mx-auto"
        />
      </div>
    </SliderComp>
    </div>
  );
}
