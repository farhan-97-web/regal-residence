import React from 'react';

const FaQ = () => {
  
    return (
        <div>
            <p className='text-lg lg:text-3xl font-bold text-center my-8'>Frequently Asked Qustions</p>
            <div className="hero bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src="https://cdni.iconscout.com/illustration/premium/thumb/faq-illustration-download-in-svg-png-gif-file-formats--customer-questions-interrogation-point-and-answers-helpful-information-q-a-whoooa-solid-1-pack-people-illustrations-3779152.png?f=webp"
      className="w-full lg:w-1/2 rounded-lg shadow-2xl" />
    <div className='w-full lg:w-1/2'>
    <div className="collapse collapse-plus bg-base-200">
  <input type="radio" name="my-accordion-3" defaultChecked />
  <div className="collapse-title text-xl font-medium">Why should I refer to an agent?</div>
  <div className="collapse-content">
    <p>They act on your behalf as your agent, providing you with advice and guidance and doing a job helping you buy or sell a home. While it is true they get paid for what they do, so do other professions that provide advice, guidance.</p>
  </div>
</div>
<div className="collapse collapse-plus bg-base-200">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title text-xl font-medium">Should I talk to a bank before looking for a home?</div>
  <div className="collapse-content">
    <p>The answer to the question is YES! There are tons of reasons why you should talk with a bank and get pre-approved before looking at homes. First and foremost, talking with a bank before looking at homes can help you understand exactly how much you can afford</p>
  </div>
</div>
<div className="collapse collapse-plus bg-base-200">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title text-xl font-medium">Can I find trustworthy agent?</div>
  <div className="collapse-content">
    <p>Of course you can</p>
  </div>
</div>
    </div>
  </div>
</div>
        </div>
    );
};

export default FaQ;