document.addEventListener("DOMContentLoaded", function () {
  const filterTransmission = document.getElementById("filter-transmission");
  const filterFuel = document.getElementById("filter-fuel");
  const filterModel = document.getElementById("filter-model");
  const carItems = document.querySelectorAll(".car-item");

  function filterCars() {
    const transmissionValue = filterTransmission.value;
    const fuelValue = filterFuel.value;
    const modelValue = filterModel.value;

    carItems.forEach((car) => {
      const matchesTransmission =
        transmissionValue === "" ||
        car.dataset.transmission === transmissionValue;
      const matchesFuel = fuelValue === "" || car.dataset.fuel === fuelValue;
      const matchesModel =
        modelValue === "" || car.dataset.model === modelValue;

      if (matchesTransmission && matchesFuel && matchesModel) {
        car.style.display = "block";
      } else {
        car.style.display = "none";
      }
    });
  }

  filterTransmission.addEventListener("change", filterCars);
  filterFuel.addEventListener("change", filterCars);
  filterModel.addEventListener("change", filterCars);
});
