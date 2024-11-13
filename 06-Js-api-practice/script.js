const jobContainer = document.getElementById("job-container");
const loadMoreButton = document.getElementById("load-more");
const loadingText = document.getElementById("loading");

let jobIds = [];
let jobsPerPage = 6;
let currentPage = 0;

// Step 1: Fetch job IDs on initial load
async function fetchJobIds() {
  try {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/jobstories.json"
    );
    jobIds = await response.json();
    console.log("jobid", jobIds);
    console.log("response", response);
    loadJobs();
  } catch (error) {
    console.error("Error fetching job IDs:", error);
  }
}

// Step 2: Fetch job details for current page
async function loadJobs() {
  loadingText.style.display = "block";
  const start = currentPage * jobsPerPage;
  const currentJobIds = jobIds.slice(start, start + jobsPerPage);

  const jobDetails = await Promise.all(
    currentJobIds.map(async (id) => {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );

      return response.json();
    })
  );

  renderJobs(jobDetails);
  loadingText.style.display = "none";

  if ((currentPage + 1) * jobsPerPage >= jobIds.length) {
    loadMoreButton.style.display = "none";
  }
}

// Step 3: Render job cards to the page
function renderJobs(jobs) {
  jobs.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";

    const jobTitle = document.createElement("h2");
    if (job.url) {
      const jobLink = document.createElement("a");
      jobLink.href = job.url;
      jobLink.target = "_blank";
      jobLink.textContent = job.title;
      jobTitle.appendChild(jobLink);
    } else {
      jobTitle.textContent = job.title;
    }

    const jobPoster = document.createElement("p");
    jobPoster.textContent = `Posted by: ${job.by}`;

    const jobDate = document.createElement("p");
    jobDate.textContent = `Date: ${new Date(
      job.time * 1000
    ).toLocaleDateString()}`;

    jobCard.appendChild(jobTitle);
    jobCard.appendChild(jobPoster);
    jobCard.appendChild(jobDate);

    jobContainer.appendChild(jobCard);
  });
}

// Load more jobs when button is clicked
loadMoreButton.addEventListener("click", () => {
  currentPage++;
  loadJobs();
});

// Initial load of job IDs and first batch of jobs
fetchJobIds();

// const a = 10;
// console.log(a);
