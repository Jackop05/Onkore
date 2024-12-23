import React, { useState } from 'react';

const TeachersCourse = () => {
  const [topics, setTopics] = useState(["Kinematyka", "Dynamika", "Praca, moc, energia"]);
  const [newTopic, setNewTopic] = useState("");
  const [pdfs, setPdfs] = useState([
    { name: "Pdf1", link: "/sample_test_pdf1.pdf" },
    { name: "Pdf2", link: "/sample_test_pdf2.pdf" },
  ]);

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      setTopics([...topics, newTopic]);
      setNewTopic("");
    }
  };

  const handleRemoveTopic = (index) => {
    setTopics(topics.filter((_, i) => i !== index));
  };

  const handleAddPdf = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("file");
    if (file) {
      const newPdf = { name: file.name, link: URL.createObjectURL(file) };
      setPdfs([...pdfs, newPdf]);
    }
    e.target.reset();
  };

  const handleRemovePdf = (name) => {
    setPdfs(pdfs.filter((pdf) => pdf.name !== name));
  };

  const handleMeetingAction = (index, action) => {
    console.log(`Meeting ${index + 1} ${action}`); // Placeholder for actual functionality
  };

  return (
    <div className="h-screen w-screen bg-gray-100 pt-[20vh] basic relative overflow-x-hidden">
      {/* Header Section */}
      <div className="bg-neonblue text-white py-6 px-60">
        <h1 className="text-5xl font-bold drop-shadow-md">Przygotowanie do matury</h1>
        <p className="mt-4 text-3xl font-bold drop-shadow-md">Jan Kowalski</p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row px-10 py-8">
        {/* Left Section */}
        <div className="flex-1">
          {/* Przerobione tematy */}
          <div className="bg-white rounded-lg shadow-md p-6 max-w-[1200px]">
            <h2 className="px-6 text-2xl mb-4 font-bold">Przerobione tematy:</h2>
            <ul className="px-6 space-y-2 text-gray-700 flex gap-4">
              {topics.map((topic, index) => (
                <li
                  key={index}
                  className="flex items-center space between rounded-3xl bg-neonblue max-w-[500px] pl-6 pr-4 py-2 text-white text-xl self-center"
                >
                  {topic}
                  <button
                    onClick={() => handleRemoveTopic(index)}
                    className="w-6 h-6 bg-red-500 text-white rounded-full font-bold flex items-center justify-center ml-4 text-center self-center"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-4 px-6">
              <input
                type="text"
                placeholder="Dodaj nowy temat"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="p-2 border rounded-lg flex-1"
              />
              <button
                onClick={handleAddTopic}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Dodaj
              </button>
            </div>
          </div>

          {/* Terminy spotkań */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6 max-w-[1200px]">
            <h2 className="px-6 text-xl font-semibold mb-4">Terminy spotkań</h2>
            <ul className="px-6 space-y-4">
              {["28.11", "10.12", "20.12"].map((date, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
                >
                  <span className="text-lg font-medium">
                    {date} (11:15)
                  </span>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleMeetingAction(index, "approve")}
                      className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600"
                    >
                      Zatwierdź
                    </button>
                    <button
                      onClick={() => handleMeetingAction(index, "cancel")}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                    >
                      Odwołaj
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Materiały PDF */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6 max-w-[1200px]">
            <h2 className="px-6 text-xl font-semibold mb-4">Materiały PDF</h2>
            <div className="px-6 grid grid-cols-2 gap-4">
              {pdfs.map((pdf, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 p-4 rounded-lg justify-between hover:bg-gray-300 transition"
                >
                  <a href={pdf.link} download className="flex items-center">
                    <img
                      src="https://img.icons8.com/color/48/000000/pdf.png"
                      alt="PDF Icon"
                      className="w-6 h-6 mr-2"
                    />
                    {pdf.name}
                  </a>
                  <button
                    onClick={() => handleRemovePdf(pdf.name)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                  >
                    Usuń
                  </button>
                </div>
              ))}
            </div>
            <form onSubmit={handleAddPdf} className="mt-4 flex items-center gap-4">
              <input
                type="file"
                name="file"
                accept="application/pdf"
                className="p-2 border rounded-lg flex-1 hover:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Dodaj PDF
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersCourse;
