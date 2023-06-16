import "react-responsive-carousel/lib/styles/carousel.min.css";

const TopSlides = () => {
  return (
    <div className="h-[650px] mx-auto container mt-6">
      <div className="carousel h-[600px] w-full bg-orange-50">
        <div
          id="slide1"
          className="carousel-item relative w-full flex gap-6 px-10"
        >
          <img
            src="https://www.shutterstock.com/image-vector/vector-illustration-abstract-electric-lightning-260nw-1706216764.jpg"
            className="w-1/2 m-5 rounded-xl"
          />
          <div className="my-auto w-2/5">
            <div className="card-body pr-3">
              <h2 className="text-4xl font-bold text-green-700 py-6">
                Basic Electricity
              </h2>
              <p className="text-xl text-gray-600 text-justify">
                Learning basic electricity enhances your understanding of a
                fundamental aspect of modern life, provides practical skills,
                and opens up opportunities in various industries. Whether you
                want to improve your everyday life...
              </p>
              <div className="card-actions justify-end">
                <button className="btn bg-green-700 hover:bg-green-500 mt-6 text-white text-xl font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide4"
              className="text-green-700 hover:text-green-500 text-5xl"
            >
              ❮
            </a>
            <a
              href="#slide2"
              className="text-green-700 hover:text-green-500 text-5xl"
            >
              ❯
            </a>
          </div>
        </div>
        <div
          id="slide2"
          className="carousel-item relative w-full flex gap-6 px-10"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiiQL39aFxPk06obNVdLBIKnkL16ITHBHovzQd8ibvLNIEFWtBoE6FQBFpQAUQJrhHyo0&usqp=CAU"
            className="w-1/2 m-5 rounded-xl"
          />
          <div className="my-auto w-2/5">
            <div className="card-body">
              <h2 className="text-4xl font-bold text-green-700 py-6">
                Electronic Home Appliances
              </h2>
              <p className="text-xl text-gray-600 text-justify">
                Learning basic electricity enhances your understanding of a
                fundamental aspect of modern life, provides practical skills,
                and opens up opportunities in various industries. Whether you
                want to improve your everyday life...
              </p>
              <div className="card-actions justify-end">
                <button className="btn bg-green-700 hover:bg-green-500 mt-6 text-white text-xl font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide1"
              className="text-green-700 hover:text-green-500 text-5xl"
            >
              ❮
            </a>
            <a
              href="#slide3"
              className="text-green-700 hover:text-green-500 text-5xl"
            >
              ❯
            </a>
          </div>
        </div>
        <div
          id="slide3"
          className="carousel-item relative w-full flex gap-6 px-10"
        >
          <img
            src="https://fixittechsuite.com/wp-content/uploads/2012/11/image-laptop-notebook-repair.jpg"
            className="w-1/2 m-5 rounded-xl"
          />
          <div className="my-auto w-2/5">
            <div className="card-body">
              <h2 className="text-4xl font-bold text-green-700 py-6">
                Basic Computer Hardware
              </h2>
              <p className="text-xl text-gray-600 text-justify">
                Learning basic electricity enhances your understanding of a
                fundamental aspect of modern life, provides practical skills,
                and opens up opportunities in various industries. Whether you
                want to improve your everyday life...
              </p>
              <div className="card-actions justify-end">
                <button className="btn bg-green-700 hover:bg-green-500 mt-6 text-white text-xl font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide2"
              className="text-green-700 hover:text-green-500 text-5xl"
            >
              ❮
            </a>
            <a
              href="#slide4"
              className="text-green-700 hover:text-green-500 text-5xl"
            >
              ❯
            </a>
          </div>
        </div>
        <div
          id="slide4"
          className="carousel-item relative w-full flex gap-6 px-10"
        >
          <img
            src="https://i0.wp.com/www.electronicsandyou.com/wp-content/uploads/2019/08/electronic-components.jpg?resize=720%2C405"
            className="w-1/2 m-5 rounded-xl"
          />
          <div className="my-auto w-2/5">
            <div className="card-body">
              <h2 className="text-4xl font-bold text-green-700 py-6">
                Advanced Electricity
              </h2>
              <p className="text-xl text-gray-600 text-justify">
                Learning basic electricity enhances your understanding of a
                fundamental aspect of modern life, provides practical skills,
                and opens up opportunities in various industries. Whether you
                want to improve your everyday life...
              </p>
              <div className="card-actions justify-end">
                <button className="btn bg-green-700 hover:bg-green-500 mt-6 text-white text-xl font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide3"
              className="text-green-700 hover:text-green-500 text-5xl"
            >
              ❮
            </a>
            <a
              href="#slide1"
              className="text-green-700 hover:text-green-500 text-5xl"
            >
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSlides;
