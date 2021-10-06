import React from 'react';

import producto from './../../../img/producto.jfif';
import producto2 from './../../../img/producto2.jfif';
import producto3 from './../../../img/producto3.jfif';

const About = () => {
    return (
        <section id="about" className="about">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" data-aos="fade-left">
                        <h3>Productos mas vendidos</h3>
                        <div className="row">
                            <div className="col-12 col-lg-4 col-md-4 col-sm-12 icon-box" data-aos="zoom-in" data-aos-delay="100">
                                <div className="row">
                                    <div className='col-12'>
                                        <img src={producto} className="image" height='200' alt='Mas vendido' />
                                    </div>
                                    <div className='col-12'>
                                        <h4 className="title notMargin"><a href={() => false}>Lorem Ipsum</a></h4>
                                        <p className="description notMargin">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-4 col-md-4 col-sm-12 icon-box" data-aos="zoom-in" data-aos-delay="200">
                                <div className='col-12'>
                                    <img src={producto2} className="image" height='200' alt='Mas vendido' />
                                </div>
                                <h4 className="title notMargin"><a href={() => false}>Nemo Enim</a></h4>
                                <p className="description notMargin">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
                            </div>

                            <div className="col-12 col-lg-4 col-md-4 col-sm-12 icon-box" data-aos="zoom-in" data-aos-delay="300">
                                <div className='col-12'>
                                    <img src={producto3} className="image" height='200' alt='Mas vendido' />
                                </div>
                                <h4 className="title notMargin"><a href={() => false}>Dine Pad</a></h4>
                                <p className="description notMargin">Explicabo est voluptatum asperiores consequatur magnam. Et veritatis odit. Sunt aut deserunt minus aut eligendi omnis</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;