import React from "react";
import "../../styles/TopCompanies.css"; // Import the CSS file
import * as companyImages from "../../constants/companyImages"; // Import the company images

const TopCompanies = () => {
  return (
    <div className="flex flex-col p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Heading */}
      <div className="heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-shadow-effect text-center">
        Top Companies 🌍
      </div>

      {/* Subheading */}
      <div className="flex justify-center text-base sm:text-lg md:text-xl text-center text-white font-semibold mt-4 sm:mt-6 md:mt-8">
        Discover high-paying jobs from hand-picked modern tech companies
        worldwide—carefully curated for you!
      </div>

      {/* Company Logos Section */}
      <div className="flex justify-center p-4 sm:p-5 mt-4 sm:mt-5">
        <img
          src="/images/svg/frame.svg"
          alt="frame"
          className="absolute hidden lg:flex w-full sm:h-[70vh] lg:h-[90vh]"
        />
        <div className="flex flex-col justify-center rounded-3xl px-2 sm:px-4 pb-2 sm:pb-4 lg:w-3/4 w-[90vw] sm:w-[85vw] lg:h-[60vh] gap-2 sm:gap-3">
          {/* First Row of Logos */}
          <div className="flex justify-center">
            <div className="slider lef gap-1 sm:gap-2">
              {[
                companyImages.asianPaints,
                companyImages.wipro,
                companyImages.loreal,
                companyImages.walmart,
                companyImages.amazon,
                companyImages.flipkart,
                companyImages.adityaBirla,
                companyImages.hp,
                companyImages.airmeet,
                companyImages.bito,
              ].map((src, index) => (
                <div key={index} className="owl-item">
                  <img src={src} alt="company" className="responsive-img" />
                </div>
              ))}
            </div>
          </div>

          {/* Second Row of Logos */}
          <div className="flex justify-center">
            <div className="slider leftt gap-5 sm:gap-10">
              {[
                companyImages.mastercard,
                companyImages.estie,
                companyImages.exawizards,
                companyImages.fourdigit,
                companyImages.givery,
                companyImages.japanDev,
                companyImages.certifyos,
                companyImages.creattura,
                companyImages.creditbook,
                companyImages.eightyDaysJapan,
              ].map((src, index) => (
                <div key={index} className="owl-item">
                  <img src={src} alt="company" className="responsive-img" />
                </div>
              ))}
            </div>
          </div>

          {/* Third Row of Logos */}
          <div className="flex justify-center">
            <div className="slider leftt gap-5 sm:gap-10">
              {[
                companyImages.jport,
                companyImages.primenumber,
                companyImages.rakuten,
                companyImages.spiderLabs,
                companyImages.zeals,
                companyImages.lexxpluss,
                companyImages.meetsmore,
                companyImages.micoworks,
                companyImages.paypaySecurities,
              ].map((src, index) => (
                <div key={index} className="owl-item">
                  <img src={src} alt="company" className="responsive-img" />
                </div>
              ))}
            </div>
          </div>

          {/* Fourth Row of Logos */}
          <div className="flex justify-center">
            <div className="slider righ gap-3 sm:gap-5">
              {[
                companyImages.fancraze,
                companyImages.plum,
                companyImages.practo,
                companyImages.rupicard,
                companyImages.safegold,
                companyImages.sage,
                companyImages.foldhealth,
                companyImages.mpl,
                companyImages.plivo,
              ].map((src, index) => (
                <div key={index} className="owl-item">
                  <img src={src} alt="company" className="responsive-img" />
                </div>
              ))}
            </div>
          </div>

          {/* Fifth Row of Logos */}
          <div className="flex justify-center">
            <div className="slider leftt gap-5 sm:gap-10 flex justify-center">
              {[
                companyImages.simplismart,
                companyImages.swipePages,
                companyImages.trufoundry,
              ].map((src, index) => (
                <div key={index} className="owl-item">
                  <img src={src} alt="company" className="responsive-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;
