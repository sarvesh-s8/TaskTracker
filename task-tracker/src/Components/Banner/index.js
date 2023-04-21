const Banner = () => {
  return (
    <section>
      <div className="flex">
        <h3 className="text-3xl mx-auto">
          Hello welcome at{" "}
          <span className="text-purple-600  font-sans">TaskTracker</span>
        </h3>
      </div>

      <div className="relative mt-20 w-4/5 mx-auto mb-10">
        <div className="container flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24">
          <div className="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
            <img
              className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
              src="/feature-image.svg"
              alt="Feature Image"
            />
          </div>
          <div className="flex flex-1 flex-col items-center lg:items-start">
            <h1 className="text-3xl text-orange-400">Intelligent Tasks</h1>
            <p className="text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
              Looking for a way to stay organized and on top of your tasks? Look
              no further than our{" "}
              <span className="text-purple-600">TaskList Tracker</span> app!
              With our easy-to-use interface and intuitive design, you'll be
              able to quickly add tasks, set due dates and sort them
            </p>
            <a
              href="/dashboard"
              type="button"
              class="btn btn-purple hover:bg-bookmark-white hover:text-black"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
