   export const fetchHelloMessage = async (): Promise<string> => {
     const response = await fetch('/api/hello');
     if (!response.ok) {
       throw new Error(`HTTP error! Status: ${response.status}`);
     }
     return await response.text();
   };