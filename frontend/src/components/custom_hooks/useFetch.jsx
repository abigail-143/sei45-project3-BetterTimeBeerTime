const useFetch = () => {
  const fetchData = async (endpoint, method, body, token) => {
    const res = await fetch(import.meta.env.SERVER + endpoint, {
      // pls edit `SERVER` to suit your .env file
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    let returnValue = {};
    if (res.ok) {
      if (data.status === "error") {
        returnValue = { ok: false, data: data.msg };
      } else {
        returnValue = { ok: true, data };
      }
    } else {
      if (data?.errors && Array.isArray(data.errors)) {
        const messages = data.errors.map((item) => item.msg);
        returnValue = { ok: false, data: messages };
      } else if (data?.status === "error") {
        returnValue = { ok: false, data: data.message || data.msg };
      } else {
        console.log(data);
        returnValue = { ok: false, data: "An error has occurred" };
      }
    }

    return returnValue;
  };

  return fetchData;
};

export default useFetch;