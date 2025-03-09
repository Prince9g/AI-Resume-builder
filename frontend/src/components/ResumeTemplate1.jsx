import React from "react";

const ResumeTemplate1 = () => {
  return (
    <div className="w-[794px] h-[1123px] mx-auto p-10 bg-white shadow-lg border border-gray-300">
      {/* Header */}
      <div className="text-center pb-2">
        <h1 className="text-3xl font-bold">First Last</h1>
        <p className="text-sm text-gray-600">xyz@email.com | 1234567890 | 123 XYZ Street, Bangalore, IN</p>
        <p className="text-sm font-semibold mt-2">
            {/* needs to be the link */}
          <span className="text-blue-600">HackerRank</span> | GitHub | LinkedIn | Twitter | Portfolio
        </p>
      </div>

      {/* Education Section */}
      <div className="mt-4">
        <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Education</h2>
        <div className="flex justify-between items-center">
            <p className="font-semibold">XYZ University</p>
            <p className="text-sm">New Delhi, India</p>
        </div>
        <div className="flex justify-between">
            <p className="text-sm italic">B.Tech Computer Science GPA: 9.1</p>
            <p className="text-sm">June 2017 - December 2020</p>
        </div>
        <div className="flex justify-between items-center mt-2">
            <p className="font-semibold">XYZ School</p>
            <p className="text-sm">Mathura, India</p>
        </div>
        <div className="flex justify-between items-center">
            <p className="text-sm italic">InterMediate Percentage: 90.1%</p>
            <p className="text-sm">June 2017 - July 2018</p>
        </div>
      </div>

      {/* Experience Section */}
      <div className="mt-4">
        <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Experience</h2>
        <div className="flex justify-between items-center">
        <p className="font-semibold">HackerRank | Software Engineer 2</p>
        <p className="text-sm text-gray-600">Bengaluru, India | Jan 21 - Present</p>
        </div>
        
        <ul className="list-disc pl-5 text-sm">
          <li>Write a one or two-paragraph explanation of what the project aims to accomplish.</li>
          <li>Avoid delving deep into background or past projects.</li>
        </ul>
        <div className="flex justify-between items-center">
        <p className="font-semibold mt-2">Amazon | SDE 1</p>
        <p className="text-sm text-gray-600">Bangalore, India | March 2020 - Dec 2020</p>
        </div>
        <ul className="list-disc pl-5 text-sm">
          <li>Write a one or two-paragraph explanation of what the project aims to accomplish.</li>
          <li>Avoid delving deep into background or past projects.</li>
        </ul>
      </div>

    {/* Projects Section */}
    <div className="mt-4">
        <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Projects</h2>
        <div className='flex justify-between'>
            <p className="font-semibold">Project 1 <span className="text-blue-600">Live Link</span> | <span className="text-blue-600">Repo Link</span></p>
            <p className="text-sm">JavaScript, HTML, CSS</p>
        </div>
        <ul className="list-disc pl-5 text-sm">
          <li>Write a one or two-paragraph explanation of what the project aims to accomplish.</li>
          <li>Avoid delving deep into background or past projects.</li>
        </ul>
        <div className='flex justify-between mt-2'>
            <p className="font-semibold">Project 1 <span className="text-blue-600">Live Link</span> | <span className="text-blue-600">Repo Link</span></p>
            <p className="text-sm">JavaScript, HTML, CSS</p>
        </div>
        <ul className="list-disc pl-5 text-sm">
          <li>Write a one or two-paragraph explanation of what the project aims to accomplish.</li>
          <li>Avoid delving deep into background or past projects.</li>
        </ul>
      </div>

      {/* Skills Section */}
      <div className="mt-4">
        <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Skills</h2>
        <p className="text-sm"><strong>Programming Languages: </strong> C/C++, Java, JavaScript, Python, SQL</p>
        <p className="text-sm"><strong>Core competencies: </strong> MongoDB, PostgreSQL</p>
        <p className="text-sm"><strong>Frameworks/Libraries: </strong> React.js, Vue.js, Redux, Express.js</p>
        <p className="text-sm"><strong>Tech Stack: </strong> MongoDB, PostgreSQL</p>
        <p className="text-sm"><strong>Developers' Tool: </strong> MongoDB, PostgreSQL</p>
        <p className="text-sm"><strong>Additional Skills: </strong> MongoDB, PostgreSQL</p>
      </div>

      

      {/* Honors & Awards Section */}
      <div className="mt-4">
        <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Honors & Awards</h2>
        <ul className="list-disc pl-5 text-sm">
          <li>Write a one or two-paragraph explanation of what the project aims to accomplish.</li>
          <li>Avoid delving deep into background or past projects.</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeTemplate1;