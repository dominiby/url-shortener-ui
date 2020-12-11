import React, { useState, ChangeEvent, MouseEvent, FC } from 'react';
import useFetch from 'use-http';
import { CreateShortenedUrlResponse } from '../../types/responses';
import Button from './Button';
import TextField from './TextField';
import Link from './Link';
import validUrl from 'valid-url';
import './App.css';

const App: FC = () => {
  const [url, setUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    post: createShortenedUrl,
    loading,
    response,
  } = useFetch<CreateShortenedUrlResponse>(`${process.env.REACT_APP_API_URL}`);

  const changeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const generateShortUrl = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShortenedUrl('');
    if (!validUrl.isWebUri(url)) {
      setErrorMessage('Invalid url');
      return;
    }
    setErrorMessage('');

    try {
      const data = await createShortenedUrl('/url', { longUrl: url });

      if (!response.ok) {
        setErrorMessage(data.message);
        return;
      }

      setShortenedUrl(data.shortUrl);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        'Oops... Unexpected error occurred. Please check your internet connection and try again.',
      );
    }
  };

  return (
    <div className="url-shortener-container">
      <form className="url-shortener-form">
        <div className="url-shortener-form-input-container">
          <TextField
            className="url-shortener-form-input"
            onChange={changeUrl}
          />
        </div>
        <div className="url-shortener-form-button-container">
          <Button
            className="url-shortener-form-button"
            onClick={generateShortUrl}
            disabled={loading}
          />
        </div>
      </form>
      {shortenedUrl && (
        <div className="url-shortener-shortened-url-container">
          <Link
            className="url-shortener-shortened-url-link"
            href={shortenedUrl}
          />
        </div>
      )}
      {errorMessage && (
        <div className="url-shortener-error">{errorMessage}</div>
      )}
    </div>
  );
};

export default App;
