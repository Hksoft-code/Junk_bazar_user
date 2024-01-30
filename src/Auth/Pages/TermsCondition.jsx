import { useLocation, useNavigate } from "react-router-dom";

const TermsCondition = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passData = location.state ? location.state.from_page : null;
  // console.log("passData", passData);
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col font-['Gilroy-Medium']">
      <div className="w-full">
        <p className="text-lime-600 text-[25px] text-center">
          Terms and Condition
        </p>
      </div>
      <div className="h-full overflow-y-auto px-6 sm:px-12 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-[20px] font-bold"> Information</p>
          <ol className="list-decimal flex flex-col gap-2 text-[17px] ml-6">
            <li>
              Please read the terms and condition carefully which is located on
              the website (JunkBazar). The terms, guidelines, privacy policy,
              and other documents are made available by the website from time to
              time. In the case of any conflict between these terms or
              documents, the term will have an overriding effect. This agreement
              sets out the legally binding agreement between the user of the
              website and The Junk Bazar. The Junk Bazar is a platform where
              business entities facilitate the sale of paper, plastic, metal &
              electronic scrap materials. The Junk Bazar understands the
              importance of privacy and also the importance of maintaining the
              confidentiality of personal information. Our Privacy Policy is
              applied to all the products and services which are being provided
              by us, and also sets out how we may collect, disclose and use the
              personal information (name, address, localization, income, etc.)
              of users. Users may use our services and products via Mobile
              Application, Website, or by calling the Customer Support Team. By
              using our website, you hereby consent to our Privacy policy and
              agree to its Terms and conditions.
            </li>
            <li>
              By accessing or using the website in any manner like visiting,
              browsing, or surfing the site you agree to be bound by these
              terms.
            </li>
            <li>
              These terms and rights (any) may not be transferred or assigned by
              the user but may be assigned by the website without restriction.
              Any attempted transfer or assignment in violation shall be null or
              void.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[20px] font-bold"> Acceptance of Terms of Use</p>
          <ol className="list-decimal flex flex-col gap-2 text-[17px] ml-6">
            <li>
              By using or by browsing the website you are agreeing or accepting
              the terms, as amended from time to time with or without the
              notice.
            </li>
            <li>
              This website is owned and operated by The Junk Bazar and it
              reserves the right to modify or discontinue, temporarily or
              permanently at any time with or without notice. You agree that the
              website shall not be liable to you or to any third for any
              suspension or discontinuance of the website services.
            </li>
            <li>
              The Junk Bazar or the website management may modify these terms
              and conditions from time to time and these changes would be
              reflected on the website with the updated version of the terms or
              also may reflect in applications or to you via e-mail and you
              agree to be bound to the changes of these terms when you use our
              website or website services.
            </li>
            <li>
              When you register an account on our website and upload, submit,
              and enter any information to the website then you shall be deemed
              to have agreed to and understand the terms.
            </li>
            <li>
              The website also uses cookies and by using the website you agree
              and give us consent for the use of cookies in accordance with the
              terms of the privacy policy.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-3">
          <p className="flex flex-col">
            {" "}
            IF YOU DO NOT AGREE TO THESE TERMS OF USE, THEN YOU MAY NOT USE THE
            WEBSITE
            <span className="text-[20px] font-bold">Services</span>
          </p>
          <ol className="list-decimal flex flex-col gap-2 text-[17px] ml-6">
            <li>
              The Junk Bazar is operated in the scrap industry which means that
              it deals in location, transportation, commerce, treatment,
              recycling, and exploitation of the scrap materials such as metal,
              plastic, paper, and e-waste among others. It provides its visitor
              an online platform that allows the users to sell directly and
              execute deals that are offered by The Junk Bazar.com from time to
              time.
            </li>
            <li>
              Registered users can see their profiles & past performances
              information which the website allows. This website provides an
              e-commerce platform for users for scrap transactions.
            </li>
            <li>
              For our pickup service, you must have to provide your accurate
              information like name, address, mobile number, etc. Your pickup
              will be held on the scheduled date as provided by you while
              submitting the request. You can reschedule or cancel your pickup
              request at any time after submitting your request. You must have
              15Kg or more scrap for pickup, otherwise, pickup charges may
              apply. The rate of all materials is fixed as mentioned on our
              price list. For the rates of other materials that are not listed
              on the list then you can contact us. If there are any unforeseen
              circumstances, we can also reschedule your pickup request to
              another working day.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[20px] font-bold">
            The obligation of The Junk Bazar
          </p>
          <ol className="list-decimal flex flex-col gap-2 text-[17px] ml-6">
            <li>
              The website is a service-based platform, the sole purpose of which
              is to provide a space, where the seller of the products related to
              the scrap industry may interact and strike a deal of sale. Neither
              the Junk Bazar nor its website shall have absolute liabilities,
              responsibilities, or obligations with regards to any item, sold
              through the website.
            </li>
            <li>
              The Junk Bazar will not bring about any obligation of all nature
              emerging out of any transaction made by the seller through the
              website in the sale of any item.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[20px] font-bold">Account Registration</p>
          <ol className="list-decimal flex flex-col gap-2 text-[17px] ml-6">
            <li>
              In order to use our services provided through the website, you
              will be required to register an account with the website. At the
              time of registration of an account, the user will be asked to
              complete the registration form which shall require you to provide
              personal information.
            </li>
            <li>
              You warrant all activities that occur under your account (any
              product information, clicking to accept any terms & conditions, or
              making any payment for any services) will be deemed to have been
              authorized by you as a user, hence you warrant to have full
              authority for the associated disclosure.
            </li>
            <li>
              You represent that you have full authority to accept these terms,
              to grant any license and authorization, and to perform any of your
              obligations, you also undertake the use of the website and its
              services for personal purposes only.
            </li>
            <li>
              You should not allow another person to use your account to access
              the website.
            </li>
            <li className="flex">
              You should inform us immediately at the time of unauthorized
              access of your account. You can write us at:{" "}
              <p className="text-red-600">contact@theJunk Bazar.com</p>
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[20px] font-bold">
            Cancellation Policy for Pickups
          </p>
          <p>
            Accepting or canceling the scrap pick-up service depends upon
            whether the services are approachable to the user or not and whether
            the service boy is picking up the scrap from the location which is
            accessible. The Junk Bazar has its rights in which it can accept or
            refuse the request initiated by the seller. A seller can also start
            the request or cancel the request as per their requirements and for
            this, no charges will be applicable. Once the service boy reaches
            the location and then pays for the scrap is being done by the
            service person then the seller cannot cancel the request and cannot
            ask for the products & goods back. As per the Indian laws, illegal
            trades or activities are not allowed, if any activity takes place
            then strict action can be taken as per the court of law.
          </p>
          <p className="text-[20px] font-bold">
            User IDs-Passwords and Account deletion
          </p>
          <ol className="list-decimal flex flex-col gap-2 text-[17px] ml-6">
            <li>
              The website provides your User ID and Password during registration
              so you must not use your account ID name in connection with the
              impersonation of any person.
            </li>
            <li>
              You shall maintain the confidentiality of your password for which
              you should be responsible only.
            </li>
            <li>
              During registration the data or personal information we collect is
              subject to the terms of our Privacy Policy.
            </li>
            <li>
              We may suspend, cancel or deactivate your account at any time in
              the sole discretion without notice as well as any other
              explanation.
            </li>
            <li className="flex">
              You may also cancel your account on the website by emailing us at
              <p className="text-red-600">contact@theJunk Bazar.com</p>
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[20px] font-bold">Electronic Signature Consent</p>
          <ol className="list-decimal flex flex-col gap-2 text-[17px] ml-6">
            <li>
              Not to access the website or its services using a third-party’s
              account without the express consent of the account holder.
            </li>
            <li>Not to use websites for illegal purposes</li>
            <li>
              Not to commit any act of infringement on the website with respect
              to the content
            </li>
            <li>
              Not to attempt to gain unauthorized access to another computer
              system through the website
            </li>
            <li>
              Not to upload or transmit viruses or other harmful files which are
              destructive in nature
            </li>
            <li>
              Not to use the website in a way that may cause damage to the
              website’s availability or accessibility
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[20px] font-bold">Effect of Breach by User</p>
          <p>
            If any factual breach by any user for any cause, The Junk Bazar
            shall have the right to impose a penalty, restrict, refuse or ban
            any and all current or future use of any other service provided by
            the Junk Bazar.
          </p>
          <p className="text-[20px] font-bold">Trademarks</p>
          <p>
            The website, its logos, and its other registered trademarks belong
            to the company i.e; The Junk Bazar. The Junk Bazar, the website, and
            the management of the website give no permission to you for the use
            of these trademarks and such use may constitute an infringement of
            Intellectual Property Rights.
          </p>
          <p className="text-[20px] font-bold">Amendments</p>
          <p>
            The Junk Bazar hereby reserves the right to update, modify, change,
            amend, terminate or discontinue the Website, the terms, and policy
            at any time and at its sole and final discretion. The Junk Bazar may
            change the website’s functionalities and applicable changes at any
            time. Any changes to these terms will be displayed on the website
            and we may also notify you through the website or by email. Your use
            of our services after the effective date of any update either by an
            account registration or simple use- thereby indicates your
            acceptance thereof.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[20px] font-bold">Contact</p>
          <p className="min-large:flex">
            For any inquiries or complaints regarding the service or website,
            please contact- ASAR Green Kabadi Pvt Ltd{" "}
            <p className="text-red-600 min-large:ml-2">
              www.theJunk Bazar.com +91 7697 260 260 (contact@theJunk
              Bazar.com.)
            </p>{" "}
            <a
              href="https://www.thekabadiwala.com/contact-us"
              className="text-blue-600 min-large:ml-4"
            >
              You can reach us here →{" "}
            </a>
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 mb-6">
        <button
          type="button"
          className="bg-lime-600 px-6 py-2 text-white shadow-lg rounded-lg"
          onClick={() => {
            if (passData == "signIn") {
              navigate("/sign-in");
            } else if (passData == "otp-verify") {
              navigate("/otp-verify");
            }
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default TermsCondition;
