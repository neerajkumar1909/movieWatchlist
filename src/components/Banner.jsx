import "./Banner.css";

function Banner() {
  return (
    <div className="banner w-[100%] md:h-[75vh] bg-cover bg-center flex items-end">
      <div className="moviename w-full text-white text-center text-2xl bg-gray-900 p-3">
        <span> The Avengers </span>
      </div>
    </div>
  );
}

export default Banner;
