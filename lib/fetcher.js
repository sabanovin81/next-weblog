import useSWr from 'swr';

const baseURL = "http://localhost:3000/";
const response = (...args) => fetch(...args).then(res => res.json());

export default function Fetcher(endpoint) {
    const { data, error } = useSWr(`${baseURL}${endpoint}`, response);

    return {
        data,
        isLoading: !error && !data,
        isError: error
    };
}