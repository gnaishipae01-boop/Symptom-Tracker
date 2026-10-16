import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const symptomInput = document.getElementById("symptomInput");
const symptomList = document.getElementById("symptomList");

async function saveSymptom() {
    console.log("1. Save button clicked!");

    const symptom = symptomInput.value.trim();
    console.log("2. Symptom entered:", symptom);

    if (symptom === "") {
        alert("Please enter a symptom.");
        return;
    }

    try {
        console.log("3. Trying to save to Firebase...");

        const docRef = await addDoc(
            collection(db, "symptoms"),
            {
                symptom: symptom,
                createdAt: new Date().toISOString()
            }
        );

        console.log("4. Saved successfully! ID:", docRef.id);

        symptomInput.value = "";
        await getSymptoms();

    } catch (error) {
        console.error("Firebase error:", error.code, error.message);
        alert("Could not save symptom: " + error.message);
    }
}

window.saveSymptom = saveSymptom;

console.log("Symptom tracker JavaScript is running!");

// LESSON 6: Retrieving and Displaying Data

async function getSymptoms() {
    try {
        const querySnapshot = await getDocs(
            collection(db, "symptoms")
        );

        const symptoms = querySnapshot.docs.map(function(document) {
            return {
                id: document.id,
                symptom: document.data().symptom
            };
        });

        symptomList.innerHTML = symptoms.map(function(item) {
            return "<li>" + item.symptom +
                ' <button onclick="deleteSymptom(\'' +
                item.id + "')\">Delete</button></li>";
        }).join("");

    } catch (error) {
        console.error("Error getting symptoms:", error);
    }
}

// LESSON 8: Deleting Data

async function deleteSymptom(id) {
    try {
        await deleteDoc(
            doc(db, "symptoms", id)
        );

        await getSymptoms();

    } catch (error) {
        console.error("Error deleting symptom:", error);
    }
}

window.deleteSymptom = deleteSymptom;

// Load saved symptoms when the page opens

getSymptoms();
