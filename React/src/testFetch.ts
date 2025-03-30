export async function testFetchForCheckDomainApprovedByDevvet() {
  const url = "https://handgamebackend-895255557740.us-central1.run.app";
  fetch(url).then(async (res) => {
    console.log("--------> Responce from backend");
    console.log(await res.text());
  });
}
