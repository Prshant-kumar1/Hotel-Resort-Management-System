
// Room Class
class Room {

    constructor(id, name, price, status, description, image, label) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.status = status;
        this.description = description;
        this.image = image;
        this.label = label;
    }

    // Display Room
    displayRoom() {

        let newRoom = document.createElement("article");

        newRoom.className = "room-card";
        newRoom.setAttribute("data-id", this.id);

        let statusClass = this.status == "Available" ? "available" : "booked";

        newRoom.innerHTML = `
            <img src="${this.image}" alt="${this.name}">

            <div class="room-card-body">

                <span class="eyebrow">${this.label}</span>

                <h2>${this.name}</h2>

                <p>${this.description}</p>

                <p>
                    <strong>Price:</strong> ₹${this.price} / night
                </p>

                <p>
                    <strong>Status:</strong>
                    <span class="room-status ${statusClass}">
                        ${this.status}
                    </span>
                </p>

                <div class="room-actions">

                    <button class="btn btn-outline"
                        onclick="editRoom(this)">
                        Edit Room
                    </button>

                    <button class="btn btn-outline"
                        onclick="toggleStatus(this)">
                        Change Status
                    </button>

                    <button class="btn btn-outline"
                        onclick="deleteRoom(this)">
                        Delete
                    </button>

                </div>

            </div>
        `;

        document.getElementById("room-list").appendChild(newRoom);
    }
}


// Room Data
let rooms = [];


// Load Existing Rooms
function loadRooms() {

    let savedRooms = localStorage.getItem("resortRooms");

    if (savedRooms != null) {

        rooms = JSON.parse(savedRooms);

    } else {

        let roomCards = document.querySelectorAll(".room-card");

        for (let i = 0; i < roomCards.length; i++) {

            let card = roomCards[i];

            let name = card.querySelector("h2").innerText;
            let label = card.querySelector(".eyebrow").innerText;
            let image = card.querySelector("img").getAttribute("src");

            let paragraphs = card.querySelectorAll(".room-card-body p");

            let description = paragraphs[0].innerText;

            let price = paragraphs[1].innerText
                .replace("Price:", "")
                .replace("₹", "")
                .replace("/ night", "")
                .trim();

            let status = card.querySelector(".room-status").innerText.trim();

            let room = new Room(
                i + 1,
                name,
                Number(price.replace(/,/g, "")),
                status,
                description,
                image,
                label
            );

            rooms.push(room);
        }

        saveRooms();
    }

    displayAllRooms();
}


// Save Rooms
function saveRooms() {

    localStorage.setItem("resortRooms", JSON.stringify(rooms));
}


// Display All Rooms
function displayAllRooms() {

    let roomList = document.getElementById("room-list");

    roomList.innerHTML = "";

    for (let i = 0; i < rooms.length; i++) {

        let room = new Room(
            rooms[i].id,
            rooms[i].name,
            rooms[i].price,
            rooms[i].status,
            rooms[i].description,
            rooms[i].image,
            rooms[i].label
        );

        room.displayRoom();
    }
}


// Add Room
function addRoom() {

    let name = prompt("Enter Room Name:");

    if (name == null || name.trim() == "") {
        alert("Please enter room name");
        return;
    }

    let price = prompt("Enter Room Price:");

    if (price == null || price.trim() == "") {
        alert("Please enter room price");
        return;
    }

    if (isNaN(price) || Number(price) <= 0) {
        alert("Please enter a valid price");
        return;
    }

    let newRoom = new Room(
        Date.now(),
        name,
        Number(price),
        "Available",
        "Newly added room",
        "images/rooms/garden-deluxe-room.jpg",
        "New Room"
    );

    rooms.push(newRoom);

    saveRooms();
    displayAllRooms();

    alert("Room Added Successfully!");
}


// Edit Room
function editRoom(button) {

    let card = button.closest(".room-card");
    let id = Number(card.getAttribute("data-id"));

    for (let i = 0; i < rooms.length; i++) {

        if (rooms[i].id == id) {

            let newName = prompt("Enter New Room Name:", rooms[i].name);

            if (newName == null || newName.trim() == "") {
                return;
            }

            let newPrice = prompt("Enter New Room Price:", rooms[i].price);

            if (newPrice == null || newPrice.trim() == "") {
                return;
            }

            if (isNaN(newPrice) || Number(newPrice) <= 0) {
                alert("Please enter a valid price");
                return;
            }

            rooms[i].name = newName;
            rooms[i].price = Number(newPrice);

            saveRooms();
            displayAllRooms();

            alert("Room Updated Successfully!");

            return;
        }
    }
}


// Change Room Status
function toggleStatus(button) {

    let card = button.closest(".room-card");
    let id = Number(card.getAttribute("data-id"));

    for (let i = 0; i < rooms.length; i++) {

        if (rooms[i].id == id) {

            if (rooms[i].status == "Available") {
                rooms[i].status = "Booked";
            }
            else {
                rooms[i].status = "Available";
            }

            saveRooms();
            displayAllRooms();

            alert("Room Status Updated Successfully!");

            return;
        }
    }
}


// Delete Room
function deleteRoom(button) {

    let answer = confirm("Are you sure you want to delete this room?");

    if (answer == true) {

        let card = button.closest(".room-card");
        let id = Number(card.getAttribute("data-id"));

        for (let i = 0; i < rooms.length; i++) {

            if (rooms[i].id == id) {

                rooms.splice(i, 1);
                break;
            }
        }

        saveRooms();
        displayAllRooms();

        alert("Room Deleted Successfully!");
    }
}


// Load Page
loadRooms();
