import React from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/autoplay";
import { Autoplay, Navigation, Pagination, Parallax } from "swiper/modules";

// Images
import hero1 from "../../assets/HeroImg/motivational-hd-image-giving-strength-646rnlru3b3md1pu.jpg";
import hero2 from "../../assets/HeroImg/1740963018565.jpg";
import hero3 from "../../assets/HeroImg/pexels-prateekkatyal-2740956.jpg";

// Hooks & utils
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import CardSection from "./CardSection";
import { useNavigate } from "react-router";
import Loading from './../Share/Loading/Loading';
import useAuth from "../../Hooks/useAuth";

const Home = () => {
   const {user}=useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
//faqs
  const faqs = [
    { question: "Is this platform free?", answer: "Yes! You can read and share lessons for free." },
    { question: "How can I become a contributor?", answer: "Simply sign up and start posting your life lessons." },
    { question: "Can I save lessons for later?", answer: "Absolutely. Use the bookmark feature to save your favorites." },
  ];

  // Featured lessons
  const { data: featuredLessons = [], isLoading: featureLoading } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/life_lessons?featured=true");
      return Array.isArray(res.data.lessons) ? res.data.lessons : [];
    },
  });

  // Top contributors
  const { data: topContributors = [], isLoading: topLoading } = useQuery({
    queryKey: ["topContributors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-contributors");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Most saved lessons
  const { data: mostSavedLessons = [], isLoading: mostLoading } = useQuery({
    queryKey: ["mostSavedLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/life_lessons?sort=favorites");
      return Array.isArray(res.data.lessons) ? res.data.lessons : [];
    },
  });

  if (featureLoading || topLoading || mostLoading) {
    return (
      <p className="text-primary flex justify-center items-center mt-5">
        Loading...
      </p>
    );
  }

  return (
    <div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={800}
        parallax={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide
          style={{
            backgroundImage: `url(${hero1})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            height: "80vh",
          }}
        >
          <div className="w-full h-full bg-black/50 flex flex-col justify-center text-white px-6">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Wake Up With Determination
            </h2>
            <p className="text-xl text-gray-200 mb-4">
              Success doesn’t need perfection, it needs consistency
            </p>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide
          style={{
            backgroundImage: `url(${hero3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "80vh",
          }}
        >
          <div className="w-full h-full bg-black/50 flex flex-col justify-center text-white px-6">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              You Wish You Had Met Earlier
            </h2>
            <p className="text-xl text-gray-200">Small habits build powerful futures</p>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide
          style={{
            backgroundImage: `url(${hero2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "80vh",
          }}
        >
          <div className="w-full h-full bg-black/50 flex flex-col justify-center text-white px-6">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Your Career Is Built By Choices
            </h2>
            <p className="text-xl text-gray-200">Discipline creates opportunity</p>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="max-w-11/12 mx-auto mt-10  ">
        {/* Featured Lessons */}
        <section>
          <h2 className="bg-gradient-to-r from-[#cca3b3] to-[#8a6b7a] bg-clip-text text-center text-2xl sm:text-3xl md:text-4xl mb-6 text-transparent">
            🌟 Featured Life Lessons
          </h2>

          {featuredLessons.length === 0 ? (
            <p className="text-gray-500 text-center">No featured lessons yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredLessons.slice(0, 3).map((lesson) => (
                <div key={lesson._id} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="font-semibold text-lg">{lesson.title}</h3>
                    <p className="text-sm text-gray-500">{lesson.category}</p>
                    <p className="text-gray-600 line-clamp-3">{lesson.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Card Section */}
        <CardSection />

        {/* Top Contributors */}
        <section className="shadow-xl p-6 mb-10 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#cca3b3] to-[#8a6b7a] text-center bg-clip-text text-transparent">
            🏆 Top Contributors of the Week
          </h2>

          {topContributors.length === 0 ? (
            <p className="text-gray-500">No contributors found.</p>
          ) : (
            <div className="grid grid-cols-1   sm:grid-cols-2 md:grid-cols-4 gap-6">
              {topContributors.map((user) => (
                <div key={user?.email} className=" rounded-xl bg-base-100 shadow-lg text-center p-4">
                  <img
                    src={user?.photoURL}
                    alt="user"
                    className="w-20 h-20 mx-auto rounded-full"
                  />
                  <h4 className="font-semibold mt-2">{user?.displayName}</h4>
                  <p className="text-sm text-gray-500">Lessons: {user?.lessonCount}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Most Saved Lessons */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#cca3b3] to-[#8a6b7a] bg-clip-text text-transparent text-center">
            ❤️ Most Saved Lessons
          </h2>

          {mostSavedLessons.length === 0 ? (
            <p className="text-gray-500">No saved lessons found.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {mostSavedLessons
                .filter((lesson) => lesson.privacy !== "private")
                .slice(0, 6)
                .map((lesson) => (
                  <div key={lesson._id} className="card bg-base-100 shadow">
                    <div className="card-body">
                      <h3 className="font-semibold">
                        {lesson.title} ({lesson.totalFavorites || 0})
                      </h3>
                      <div className="tooltip" data-tip="Lesson Details">
                        <button
                          onClick={() => navigate(`/details-lesson/${lesson?._id}`)}
                          className="btn flex btn-sm bg-primary text-white hover:bg-primary/80"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
     {/* --- SECTION 10: FAQ --- */}
        <section className="mb-10 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#cca3b3] to-[#8a6b7a] bg-clip-text text-transparent text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" defaultChecked={index === 0} /> 
                        <div className="collapse-title text-xl font-medium">
                            {faq.question}
                        </div>
                        <div className="collapse-content"> 
                            <p className="bg-gradient-to-r from-[#cca3b3] to-[#8a6b7a] bg-clip-text text-transparent ">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* --- SECTION 11: NEWSLETTER --- */}
        <section className="py-16 my-10 bg-neutral text-neutral-content rounded-3xl text-center px-6">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Weekly Wisdom to Your Inbox</h2>
                <p className="mb-8 text-neutral-content/80">Join 8,000+ subscribers getting the best life lessons delivered every Monday.</p>
                <div className="join w-full max-w-md">
                    <input className="input input-bordered join-item w-full text-black" placeholder="Enter your email" />
                    <button className="btn btn-primary join-item">Subscribe</button>
                </div>
            </div>
        </section>

        {/* --- SECTION 12: CALL TO ACTION (CTA) --- */}
        <section className="py-20 text-center bg-[url('https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-fixed bg-center relative rounded-xl mb-10 overflow-hidden">
             <div className="absolute inset-0 bg-black/60"></div>
             <div className="relative z-10 text-white max-w-2xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Share Your Story?</h2>
                <p className="text-xl mb-8 text-gray-200">Your experiences can light the path for others. Join our community today.</p>
                <button onClick={() => navigate(user ? "/dashboard/add-lessons" : "/login")} className="btn btn-lg btn-primary border-none shadow-lg hover:scale-105 transition-transform">
                    Get Started for Free
                </button>
             </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
