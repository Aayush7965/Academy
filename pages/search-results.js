import { useRouter } from 'next/router';
import SearchResults from './SearchResults';

const SearchResultsPage = () => {
  const router = useRouter();
  const { query, filter } = router.query;
  return <SearchResults searchTerm={query || ''} filterTerm={filter || ''}/>;
};

export default SearchResultsPage;