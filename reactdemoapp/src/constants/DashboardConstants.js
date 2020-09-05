/** @author Tomi Lechpammer
 * These constants determine what data is pulled and displayed to users on the dashboard.
 * A conditional checks whether the logged in user is a donor or requestor,
 * then sets the constants accordingly.
 */
export const donorConstants = {
    fetch: "/user/username/",
    donationsTable: "Your Active Donations",
    noDonationsTable: "You currently have no active donations",
    donationsGraphs: "Your Contributions",
    noDonationsGraphs: "You have not made any donations yet"
  }
export const requestorConstants = {
  fetch: "/user/reqemail/",
  donationsTable: "Donations Received",
  noDonationsTable: "You have not yet received any donations",
  donationsGraphs: "Donations Overview",
  noDonationsGraphs: ""
}