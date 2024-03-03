import { useEffect } from "react";

const BASE_URL = `http://localhost:3000`;

const URL_CS_50 =
  "https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLhQjrBD2T380xvFSUmToMMzERZ3qB5Ueu&part=snippet&maxResults=10";
//10
const URL_DAVE =
  "https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PL0Zuz27SZ-6Pk-QJIdGd1tGZEzy9RTgtj&part=snippet&maxResults=36";
//36
const URL_TYPESCRIPT =
  "https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PL0Zuz27SZ-6NS8GXt5nPrcYpust89zq_b&part=snippet&maxResults=26";
//26
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7d149e421bmsh2e73034a6d0da6dp17df31jsn1d2252c67f06",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

/* fetch(`${BASE_URL}/items`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(item),
}); */

async function addPlaylistsToDb() {
  try {
    const res1 = await fetch(URL_CS_50, options);
    if (!res1.ok) throw new Error("Couldn't fetch playlist");
    const data1 = await res1.json();
    const dataList1 = data1.items;

    const res2 = await fetch(URL_DAVE, options);
    if (!res2.ok) throw new Error("Couldn't fetch playlist");
    const data2 = await res2.json();
    const dataList2 = data2.items;

    const res3 = await fetch(URL_TYPESCRIPT, options);
    if (!res3.ok) throw new Error("Couldn't fetch playlist");
    const data3 = await res3.json();
    const dataList3 = data3.items;

    const dataListTemp = [...dataList1, ...dataList2, ...dataList3];
    console.log(dataListTemp);
    const dataList = dataListTemp.forEach(async (obj) => {
      let thumbnail;
      if (obj.snippet.thumbnails.maxres?.url !== undefined)
        thumbnail = obj.snippet.thumbnails.maxres.url;
      if (
        obj.snippet.thumbnails.high?.url !== undefined &&
        thumbnail === undefined
      )
        thumbnail = obj.snippet.thumbnails.high.url;
      if (
        obj.snippet.thumbnails.standard?.url !== undefined &&
        thumbnail === undefined
      )
        thumbnail = obj.snippet.thumbnails.standard.url;
      if (
        obj.snippet.thumbnails.medium?.url !== undefined &&
        thumbnail === undefined
      )
        thumbnail = obj.snippet.thumbnails.medium.url;
      if (
        obj.snippet.thumbnails.dafault?.url !== undefined &&
        thumbnail === undefined
      )
        thumbnail = obj.snippet.thumbnails.default.url;
      const newEntry = {
        id: obj.id,
        publishedAt: obj.snippet.publishedAt,
        title: obj.snippet.title,
        description: obj.snippet.description,
        thumbnail,
        url: obj.snippet.resourceId.videoId,
        videoOwnerChannelTitle: obj.snippet.videoOwnerChannelTitle,
        videoOwnerChannelId: obj.snippet.videoOwnerChannelId,
      };
      await fetch(`${BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });
    });
    console.log(dataList);
  } catch (err) {
    console.error(err);
  }
}
async function addCommentsToVideos() {
  try {
    const res = await fetch(`${BASE_URL}/items`);
    const data = await res.json();
    const dataSliced = data.slice(70, 71);
    console.log(dataSliced);
    dataSliced.forEach(async (obj) => {
      const url = obj.url;
      const res1 = await fetch(
        `https://youtube-v31.p.rapidapi.com/commentThreads?part=snippet&videoId=${url}&maxResults=1`,
        options
      );
      const data1 = await res1.json();
      const com = data1.items;
      const comments = com.map((obj) => {
        return {
          textOriginal: obj.snippet.topLevelComment.snippet.textOriginal,
          authorDisplayName:
            obj.snippet.topLevelComment.snippet.authorDisplayName,
          authorProfileImageUrl:
            obj.snippet.topLevelComment.snippet.authorProfileImageUrl,
          authorChannelUrl:
            obj.snippet.topLevelComment.snippet.authorChannelUrl,
          authorChannelId: obj.snippet.topLevelComment.snippet.authorChannelId,
          likeCount: obj.snippet.topLevelComment.snippet.likeCount,
          publishedAt: obj.snippet.topLevelComment.snippet.publishedAt,
        };
      });
      const fullObj = { ...obj, comments };
      console.log(fullObj);

      await fetch(`${BASE_URL}/items/${fullObj.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullObj),
      });
    });
  } catch (err) {
    console.error(err);
  }
}

//addCommentsToVideos();

async function testComments() {
  const res = await fetch(`${BASE_URL}/items`);
  const data = await res.json();
  let x = 0;
  data.forEach((obj) => {
    if (Object.keys(obj).length === 0) console.log(obj);
    if (Object.keys(obj).length > 0) {
      x++;
    }
    console.log(x);
  });
}

//testComments();

async function addLikesToVideos() {
  try {
    const res = await fetch(`${BASE_URL}/items`);
    const data = await res.json();
    const dataSliced = data.slice(70, 71);
    //console.log(dataSliced);
    dataSliced.forEach(async (obj) => {
      const url = obj.url;
      const res1 = await fetch(
        `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${url}`,
        options
      );
      const data1 = await res1.json();
      const videoStats = data1.items.at(0).statistics;
      //console.log(stats);

      const fullObj = { ...obj, videoStats };
      console.log(fullObj);

      await fetch(`${BASE_URL}/items/${fullObj.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullObj),
      });
    });
  } catch (err) {
    console.error(err);
  }
}

async function fetchChannelDetails() {
  try {
    const res = await fetch(`${BASE_URL}/items`);
    const data = await res.json();
    const dataSliced = data.slice(70, 71);
    //console.log(dataSliced);

    dataSliced.forEach(async (obj) => {
      const url = obj.videoOwnerChannelId;

      const res1 = await fetch(
        `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${url}`,
        options
      );

      const data1 = await res1.json();
      const item = data1.items.at(0);

      let channelImg = item.snippet.thumbnails?.high.url;
      if (channelImg === undefined)
        channelImg = item.snippet.thumbnails?.medium.url;
      if (channelImg === undefined)
        channelImg = item.snippet.thumbnails?.default.url;

      const details = {
        channelImg,
        subsCount: item.statistics.subscriberCount,
      };

      const fullObj = { ...obj, details };
      console.log(fullObj);

      fetch(`${BASE_URL}/items/${fullObj.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullObj),
      });
    });
  } catch (err) {
    console.error(err);
  }
}

// fetchChannelDetails();

/* 
# CHANEL DETAILS 
- profile image
- subs count

*/
