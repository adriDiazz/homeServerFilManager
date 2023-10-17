import { useState } from "react";

type HttpMethod = "GET" | "POST";

interface FetchResponse<Data> {
  data: Data | null;
  loading: boolean;
  error: string | null;
  fetchData: (url: string, method?: HttpMethod, body?: unknown) => void;
}

const useFetch = <Data>() => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (
    url: string,
    method: HttpMethod = "GET",
    body: unknown = null
  ) => {
    console.log(typeof body);
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      };

      const response = await fetch(url, options);
      const responseData: Data = await response.json();

      if (!response.ok) {
        throw new Error("Hubo un problema en la solicitud.");
      }

      setData(responseData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData } as FetchResponse<Data>;
};

export default useFetch;
