<template>
  <div class="card">
    <slot name="card-image">
      <div class="card-image">
        <img
          src="https://media.istockphoto.com/id/1295362795/photo/angry-cat.webp?b=1&s=612x612&w=0&k=20&c=T9N8tLQKccCntamzO10IZuQLC6jQ9Vr_a4pVeYibwTg="
          alt="Random Cat Pic"
        />
      </div>
    </slot>
    <slot name="card-body">
      <div class="card-body">
        <span class="tag tag-purple">Random Tag</span>
        <h4>Random File Name</h4>
        <p>File Description: Random File Description</p>
        <p>Created At: Random Date</p>
      </div>
    </slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.card {
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card-image {
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  min-height: 250px;
}

.tag {
  background-color: #cccccc;
  border-radius: 50px;
  font-size: 12px;
  margin: 0;
  color: #fff;
  padding: 2px 10px;
  text-transform: uppercase;
  cursor: pointer;
}

.tag-aqua {
  background-color: $josef-aqua;
}

.tag-purple {
  background-color: $josef-purple;
}

.tag-light-red {
  background-color: $josef-light-red;
}
</style>
