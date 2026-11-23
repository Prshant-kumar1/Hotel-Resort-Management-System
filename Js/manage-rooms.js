
// Function to Add New Room
function addRoom() {

    let roomName = prompt("Enter Room Name:");
    let roomPrice = prompt("Enter Room Price:");

    if (roomName == "" || roomName == null ||
        roomPrice == "" || roomPrice == null) {

        alert("Please enter all room details");
    }

    else {

        let roomList = document.getElementById("room-list");

        let newRoom = document.createElement("article");

        newRoom.className = "room-card";

        newRoom.innerHTML = `
            <img src="images/rooms/garden-deluxe-room.jpg"
                 alt="New Room">

            <div class="room-card-body">

                <span class="eyebrow">New Room</span>

                <h2>${roomName}</h2>

                <p>Newly added room</p>

                <p>
                    <strong>Price:</strong>
                    ₹${roomPrice} / night
                </p>

                <p>
                    <strong>Status:</strong>
                    <span class="room-status available">
                        Available
                    </span>
                </p>

                <div class="room-actions">

                    <button class="btn btn-outline"
                        onclick="editRoom(this)">
                        Edit Room
                    </button>

                    <button class="btn btn-outline"
                        onclick="deleteRoom(this)">
                        Delete
                    </button>

                </div>

            </div>
        `;

        roomList.appendChild(newRoom);

        alert("Room Added Successfully!");
    }
}


// Function to Delete Room
function deleteRoom(button) {

    let confirmDelete = confirm("Are you sure you want to delete this room?");

    if (confirmDelete == true) {

        let room = button.closest(".room-card");

        room.remove();

        alert("Room Deleted Successfully!");
    }
}


// Function to Edit Room
function editRoom(button) {

    let room = button.closest(".room-card");

    let newName = prompt("Enter New Room Name:");

    if (newName != "" && newName != null) {

        room.querySelector("h2").innerText = newName;

        alert("Room Updated Successfully!");
    }

    let newPrice = prompt("Enter New Room Price:");

    if (newPrice != "" && newPrice != null) {

        room.querySelectorAll(".room-card-body p")[1].innerHTML =
            "<strong>Price:</strong> ₹" + newPrice + " / night";

        alert("Price Updated Successfully!");
    }
}
