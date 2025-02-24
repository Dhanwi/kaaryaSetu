import React from "react";
import "../../styles/TopCompanies.css"; // Import the CSS file
import * as companyImages from "../../constants/companyImages"; // Import the company images

const TopCompanies = () => {
  return (
    <div className="flex flex-col p-10">
      <div className="heading font-bold md:text-3xl text-2xl lg:text-5xl text-white text-shadow-effect text-center">
        Top Companies 🌍
      </div>
      <div className="flex justify-center text-lg text-center text-white font-semibold mt-8">
        Discover high-paying jobs from hand-picked modern tech companies
        worldwide—carefully curated for you!
      </div>

      <div className=" flex justify-center p-5 mt-5">
        <img
          src="/images/svg/frame.svg"
          alt="frame"
          className="absolute hidden lg:flex w-full  sm:h-[70vh] lg:h-[90vh]"
        />
        <div className="flex flex-col justify-center rounded-3xl px-4 pb-4 lg:w-3/4 sm:h-[39vh] w-[85vw] lg:h-[60vh] gap-3">
          <div className="flex justify-center ">
            <div className="slider lef gap-2">
              <div className="owl-item">
                <img
                  src={companyImages.asianPaints}
                  alt="asian paints"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.wipro}
                  alt="wipro"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.loreal}
                  alt="loreal"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.walmart}
                  alt="walmart"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.amazon}
                  alt="amazon"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.flipkart}
                  alt="flipkart"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.adityaBirla}
                  alt="aditya birla"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.hp}
                  alt="hp"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.airmeet}
                  alt="airmeet"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.bito}
                  alt="bito"
                  className="responsive-img"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="slider leftt gap-10">
              <div className="owl-item">
                <img
                  src={companyImages.mastercard}
                  alt="mastercard"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.estie}
                  alt="estie"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.exawizards}
                  alt="exawizards"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.fourdigit}
                  alt="fourdigit"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.givery}
                  alt="givery"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.japanDev}
                  alt="japan dev"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.certifyos}
                  alt="certifyos"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.creattura}
                  alt="creattura"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.creditbook}
                  alt="creditbook"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.eightyDaysJapan}
                  alt="eighty days japan"
                  className="responsive-img"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center ">
            <div className="slider leftt gap-10">
              <div className="owl-item">
                <img
                  src={companyImages.jport}
                  alt="jport"
                  className="responsive-img"
                />
              </div>{" "}
              <div className="owl-item">
                <img
                  src={companyImages.primenumber}
                  alt="primenumber"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.rakuten}
                  alt="rakuten"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.spiderLabs}
                  alt="spider labs"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.zeals}
                  alt="zeals"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.lexxpluss}
                  alt="lexxpluss"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.meetsmore}
                  alt="meetsmore"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.micoworks}
                  alt="micoworks"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.paypaySecurities}
                  alt="paypay securities"
                  className="responsive-img"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="slider righ gap-5">
              <div className="owl-item">
                <img
                  src={companyImages.fancraze}
                  alt="fancraze"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.plum}
                  alt="plum"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.practo}
                  alt="practo"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.rupicard}
                  alt="rupicard"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.safegold}
                  alt="safegold"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.sage}
                  alt="sage"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.foldhealth}
                  alt="foldhealth"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.mpl}
                  alt="mpl"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.plivo}
                  alt="plivo"
                  className="responsive-img"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center ">
            <div className="slider leftt gap-10 flex justify-center">
              <div className="owl-item">
                <img
                  src={companyImages.simplismart}
                  alt="simplismart"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.swipePages}
                  alt="swipePages"
                  className="responsive-img"
                />
              </div>
              <div className="owl-item">
                <img
                  src={companyImages.trufoundry}
                  alt="trufoundry"
                  className="responsive-img"
                />
              </div>
              {/* <div className="owl-item">
            <img
              src={companyImages.cred}
              alt="cred"
              className="responsive-img"
            />
          </div>
          <div className="owl-item">
            <img
              src={companyImages.dream11}
              alt="dream11"
              className="responsive-img"
            />
          </div>
          <div className="owl-item">
            <img
              src={companyImages.groww}
              alt="groww"
              className="responsive-img"
            />
          </div>
          <div className="owl-item">
            <img
              src={companyImages.jupiter}
              alt="jupiter"
              className="responsive-img"
            />
          </div>
          <div className="owl-item">
            <img
              src={companyImages.meesho}
              alt="meesho"
              className="responsive-img"
            />
          </div>
          <div className="owl-item">
            <img
              src={companyImages.paytm}
              alt="paytm"
              className="responsive-img"
            />
          </div>
          <div className="owl-item">
            <img
              src={companyImages.phonepe}
              alt="phonepe"
              className="responsive-img"
            />
          </div>
          <div className="owl-item">
            <img
              src={companyImages.razorpay}
              alt="razorpay"
              className="responsive-img"
            />
          </div>
          <div className="owl-item">
            <img
              src={companyImages.slice}
              alt="slice"
              className="responsive-img"
            />
          </div>
          <div className="owl-item">
            <img
              src={companyImages.upstox}
              alt="upstox"
              className="responsive-img"
            />
          </div>
          <div className="owl-item">
            <img
              src={companyImages.zerodha}
              alt="zerodha"
              className="responsive-img"
            />
          </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;
