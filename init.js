var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/13O4nLPWB_EthH8CEnXnunlTkWoS9RoKGJC4s7c0Kwzc/pub?output=csv';
function init() {
    Papa.parse(public_spreadsheet_url, {
        download: true,
        header: true,
        complete: function(results) {
            var data = results.data
            console.log(data)
        }
    })
}
window.addEventListener('DOMContentLoaded', init)