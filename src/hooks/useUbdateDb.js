import { useEffect } from "react";

const BASE_URL = `http://localhost:3000`;

function useUbdateDb(type) {
  useEffect(() => {
    const url = `https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=${"PLhQjrBD2T380xvFSUmToMMzERZ3qB5Ueu"}&part=snippet&maxResults=10`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "7d149e421bmsh2e73034a6d0da6dp17df31jsn1d2252c67f06",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };
    async function addNewPlaylistToDb() {
      try {
        const res = await fetch(url, options);
        const result = await res.json();
        result.items.forEach((item) => {
          console.log(item);
          fetch(`${BASE_URL}/items`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          });
        });
      } catch (error) {
        console.error(error);
      } finally {
        console.log("cs50");
      }
    }

    async function addCommentsToVideo() {
      const url =
        "https://youtube-v31.p.rapidapi.com/commentThreads?part=snippet&videoId=NcoBAfJ6l2Q&maxResults=10";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "7d149e421bmsh2e73034a6d0da6dp17df31jsn1d2252c67f06",
          "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
        },
      };
      const res = await fetch(`${BASE_URL}/items`);
      const data = await res.json();

      const item = data[9];

      let itemUrl = item.snippet.resourceId.videoId;
      let itemId = item.id;
      //console.log(itemUrl);

      const res2 = await fetch(
        `https://youtube-v31.p.rapidapi.com/commentThreads?part=snippet&videoId=${itemUrl}&maxResults=1`,
        options
      );
      const comment = await res2.json();
      //const comment = JSON.stringify(dataRes);
      //console.log(dataRes);

      const newObj = { ...item, comment };

      const newObjJson = JSON.stringify(newObj);
      await fetch(`${BASE_URL}/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: newObjJson,
      });
    }

    if (type === "AddNewPlaylist") addNewPlaylistToDb();
    //if (type === "comment") addCommentsToVideo();
  }, [type]);
}

export default useUbdateDb;
