import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BenefitsAndQuestions from '../../components/BenefitsAndQuestions/BenefitsAndQuestions';
import Statistics from '../../components/Statistics/Statistics';
import HowDoesSHWork from '../../components/HowDoesSHWork/HowDoesSHWork';
import OurServices from '../../components/OurServices/OurServices';
import NamingContest from '../../components/NamingContest/NamingContest';
import TopicsSection from '../../components/TopicsSection/TopicsSection';
import FeatureDiv from '../../components/FeatureDiv /FeatureDiv';

export default class HowItWorksPage extends Component {

  render() {
    return (
      <>
        <Header />
        <HowDoesSHWork />
        <OurServices />
        <NamingContest />
        <TopicsSection />
        <Statistics />
        <BenefitsAndQuestions />
        <FeatureDiv />
        <Footer />
      </>


    )
  }
}
