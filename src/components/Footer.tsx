
import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SweetVoice. All rights reserved.
          </p>
          <div className="mt-2 md:mt-0">
            <p className="text-xs text-muted-foreground text-center md:text-right">
              Disclaimer: This is a prototype application and not intended for clinical use. 
              Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
