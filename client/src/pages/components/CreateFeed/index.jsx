// CreatePage.js
/*import React, { useState } from 'react';
import Logo from '../Logo'; // Assuming you have a Logo component
import axios from 'axios';
import { Link } from 'react-router-dom';
const CreateFeed = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [serverOutput, setServerOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [shortUrl, setShortUrl] = useState('')
  const [error,setError] = useState(null)
  const redirectToExternalWebsite = async () => {
    window.open(`http://localhost:5173/${shortUrl}`, '_blank');
  };


  const handleGenerate = async () => {
    setIsGenerating(true);
    if(!originalUrl){
      setError("Original Url is required")
      setIsGenerating(false)
      return
    }
    try {
      // Replace the URL with your backend API endpoint for short URL generation
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json', // Specify the content type
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include any additional headers, e.g., Authorization
          // Add other headers as needed
        },
      };
      const response = await axios.post('https://short-url-generator-ficq.onrender.com/api/v1/urls/generate-url', { url: originalUrl }, config)
      console.log(response.data)
      const { data } = response.data
      console.log(response.data.message)
      // Assuming the server returns the short URL or an error message
      if (response.data.success) {
        setServerOutput(`http://localhost:5173/${data.shortUrl}`);
        setShortUrl(data.shortUrl)
        console.log(shortUrl)

      }

    } catch (error) {
      console.error('Error:', error.message);
      setError('An error occurred while generating the short URL.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center pt-[10%] h-screen p-6 bg-gray-200" >
      <div className='flex flex-col w-[50%]'>
      <div className="flex items-center justify-center mb-8">
        <Logo />
      </div>

      <div className="mb-4">
        <label className="text-gray-600 font-semibold mb-2" htmlFor="originalUrl">
          Original URL:
        </label>
        <input
          type="text"
          id="originalUrl"
          className="border rounded mt-2 px-3 py-2 w-full bg-gray-700 text-white"
          value={originalUrl}
          onChange={(e) => {
            setOriginalUrl(e.target.value)
            setServerOutput(null)
            setError(null)
          }}
        />
      </div>

      <div className='flex justify-center'>
        <button
          className="bg-red-400 text-white px-4 py-2 rounded "
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {serverOutput && (
        <div className="mt-8">

          <p className="text-green-600 font-semibold">
            Generated Short Url :<span className='underline cursor-pointer' onClick={redirectToExternalWebsite}>{serverOutput}</span>
          </p>


        </div>
      )}
      {error && (
        <div className="mt-8">

          <p className="text-red-600 font-semibold">
            {error}
          </p>


        </div>
      )}
      </div>
     
    </div>


  );
};

export default CreateFeed;*/
import React, { useState } from 'react';
import Logo from '../Logo';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateFeed = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [serverOutput, setServerOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState(null); // Store analytics data
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const redirectToExternalWebsite = () => {
    window.open(`http://localhost:5173/${shortUrl}`, '_blank');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    if (!originalUrl) {
      setError('Original URL is required');
      setIsGenerating(false);
      return;
    }
    try {
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };
      const response = await axios.post('https://short-url-generator-ficq.onrender.com/api/v1/urls/generate-url', { url: originalUrl }, config);
      
      const { data } = response.data;
      if (response.data.success) {
        setServerOutput(`http://localhost:5173/${data.shortUrl}`);
        setShortUrl(data.shortUrl);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('An error occurred while generating the short URL.');
    } finally {
      setIsGenerating(false);
    }
  };

  const fetchAnalytics = async () => {
    if (!shortUrl) return;

    setLoadingAnalytics(true);
    try {
      const config = {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };
      const response = await axios.get(`https://short-url-generator-ficq.onrender.com/api/v1/urls/analytics/${shortUrl}`, config);
      
      // ✅ FIX: Handle array or object response correctly
      const fetchedData = response.data.data;
      setAnalytics(Array.isArray(fetchedData) ? fetchedData[0] : fetchedData);
    } catch (error) {
      console.error('Error fetching analytics:', error.message);
      setError('Failed to fetch analytics.');
    } finally {
      setLoadingAnalytics(false);
    }
  };

  return (
    <div className="flex flex-col items-center pt-[10%] h-screen p-6 bg-gray-200">
      <div className="flex flex-col w-[50%]">
        <div className="flex items-center justify-center mb-8">
          <Logo />
        </div>

        <div className="mb-4">
          <label className="text-gray-600 font-semibold mb-2" htmlFor="originalUrl">
            Original URL:
          </label>
          <input
            type="text"
            id="originalUrl"
            className="border rounded mt-2 px-3 py-2 w-full bg-gray-700 text-white"
            value={originalUrl}
            onChange={(e) => {
              setOriginalUrl(e.target.value);
              setServerOutput(null);
              setError(null);
            }}
          />
        </div>

        <div className="flex justify-center">
          <button
            className="bg-red-400 text-white px-4 py-2 rounded"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {serverOutput && (
          <div className="mt-8">
            <p className="text-green-600 font-semibold">
              Generated Short URL: 
              <span className="underline cursor-pointer" onClick={redirectToExternalWebsite}>
                {serverOutput}
              </span>
            </p>

            {/* Button to fetch analytics */}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={fetchAnalytics}
              disabled={loadingAnalytics}
            >
              {loadingAnalytics ? 'Fetching...' : 'View Analytics'}
            </button>
          </div>
        )}

        {/* Display analytics data */}
        {analytics && (
          <div className="mt-4 p-4 border border-gray-400 rounded bg-white shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">Analytics</h3>
            <p><strong>Clicks:</strong> {analytics.totalVisits}</p>
            <p><strong>Created At:</strong> {new Date(analytics.createdAt).toLocaleString()}</p>
          </div>
        )}
        {/* {analytics && (
  <div className="mt-4 p-4 border border-gray-400 rounded bg-white shadow-md">
    <h3 className="text-lg font-semibold text-gray-800">Analytics</h3>
    <p><strong>Clicks:</strong> {analytics.totalVisits}</p>
    <p><strong>Created At:</strong> {new Date(analytics.createdAt).toLocaleString()}</p>

    <h4 className="mt-3 font-semibold text-gray-700">Visit History</h4>
    <ul className="list-disc ml-5 text-gray-600">
      {analytics.visitHistory.length > 0 ? (
        analytics.visitHistory.map((visit, index) => (
          <li key={index}>
            {new Date(visit.timestamp).toLocaleString()}
          </li>
        ))
      ) : (
        <p>No visits yet.</p>
      )}
    </ul>
  </div>
)} */}

        {error && (
          <div className="mt-8">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateFeed;
