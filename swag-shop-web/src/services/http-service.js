class HttpService {
  getProducts = async () => {
    const response = await fetch('/api/products');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };
}

export default HttpService;
