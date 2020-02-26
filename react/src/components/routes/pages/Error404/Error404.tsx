import React from 'react';

export default function Error404() {
  const fun = [
    "Pineapples not found.",
    "Page not found. I didn't eat it!",
    "Hello. Is it Page you're looking for?",
    "You found me!",
    "Ooops!"
  ];

  return <>{`Error 404! ${Math.floor(Math.random() * fun.length)}`}</>;
}