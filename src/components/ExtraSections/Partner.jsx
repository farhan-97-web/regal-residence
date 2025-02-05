import React from 'react';

const Partner = () => {
    
    return (
        <div>
            <p className='text-lg lg:text-3xl font-bold text-center my-7'>Our Bussiness Partner</p>
            <div className='flex flex-col lg:flex-row lg:flex items-center justify-center lg:gap-7'>
            <div>
                <img className='w-32' src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-world-logo-design-template-d7f49bfb3e84ff71df9c32987a39ded3_screen.jpg?ts=1585497427" alt="" />
            </div>
            <div>
                <img className='w-32' src="https://img.freepik.com/premium-vector/global-business-logo-template-design-vector_316488-1579.jpg" alt="" />
            </div>
            <div>
                <img className='w-32' src="https://dcassetcdn.com/design_img/4013469/882337/29220729/584nxzmm1nmc4cbd72xh6km994_image.png" alt="" />
            </div>
            <div>
                <img className='w-32' src="https://www.mittoevents.com/media/site/img/logo-meta.png" alt="" />
            </div>
        </div>
        </div>
    );
};

export default Partner;