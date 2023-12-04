import React from 'react';
import CourseList from './CourseList';

const SearchResults = ({ searchTerm, filterTerm }) => {
  return (
    <div>
      <h2 style={{padding: "20px"}}>Search Results</h2>
      <CourseList searchTerm={searchTerm} filterTerm={filterTerm}/>
    </div>
  );
};

export default SearchResults;