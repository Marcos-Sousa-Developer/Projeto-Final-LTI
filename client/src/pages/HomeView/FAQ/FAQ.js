import React, {useState} from 'react';
import {NavbarSupplier, Navbar, Footer, SubHeading} from '../../../components/index';

import './FAQ.css';

function FAQ() {

  const data = [
    {
      id: 1,
      question: 'Question 1',
      answer: 'Nullam non libero eu arcu varius malesuada at eget enim. Nunc sit amet mattis nunc. Nam faucibus sagittis diam ac porttito.',
    },
    {
      id: 2,
      question: 'Question 2',
      answer: 'Nullam non libero eu arcu varius malesuada at eget enim. Nunc sit amet mattis nunc. Nam faucibus sagittis diam ac porttito.',
    },
    {
      id: 3,
      question: 'Question 3',
      answer: 'Nullam non libero eu arcu varius malesuada at eget enim. Nunc sit amet mattis nunc. Nam faucibus sagittis diam ac porttito.',
    },
    {
      id: 4,
      question: 'Question 4',
      answer: 'Nullam non libero eu arcu varius malesuada at eget enim. Nunc sit amet mattis nunc. Nam faucibus sagittis diam ac porttito.',
    },
    {
      id: 5,
      question: 'Question 5',
      answer: 'Nullam non libero eu arcu varius malesuada at eget enim. Nunc sit amet mattis nunc. Nam faucibus sagittis diam ac porttito.',
    },
  ];

  const [selected, setSelected] = useState(null);

  const toggle = (i) =>{
    if (selected === i){
      return setSelected(null);
    }

    setSelected(i);
  }

  return (
    <>
      {/* Se o user for consumer então chamamos o <Navbar>, se não chamamos o <NavbarSupplier>*/}
      <Navbar></Navbar>
      <div className='app__faq main__container'>
        <SubHeading title='FAQ'></SubHeading>
        <div className='app__faq_accordion'>
          {data.map((item, i) => {
            return (
              <div key={item.id} className='app__faq_accordion-item'>
                <div className='app__faq_accordion-item_title' onClick={()=>toggle(i)}>
                  <p>{item.question}</p>
                  <span>{selected === i ? '-' : '+'}</span>
                </div>
                <p className={selected === i ? 'app__faq_accordion-item_content show' : 'app__faq_accordion-item_content'}>{item.answer}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default FAQ