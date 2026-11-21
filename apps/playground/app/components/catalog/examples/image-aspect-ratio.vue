<script setup lang="ts">
import { UIImage } from "@connextable/ui";

const source = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAACACAMAAABqWpZZAAAAD1BMVEXe7vP3xIE6YXJlkZ+62d8qKlE0AAABcklEQVR4nO3XwY6DMAxF0QLz/9/cSiyKSgKxceZhcs+2VfxuN6N5vQAAAAAAAKAwrdQznKYt9RiH6Yd6j9Hv/GwFhf2pCor7MxVUAtIU1PZnCajuz1Lw5IAUBUf7CfgPBKgRoJY+IP3fgUf/JVZPa5QkYK5+kmH/vKp8evf980b5G2H7D38nn3mn9K2I/edX7Pbra69f3d92JWh++XX/ftOZmPXlx8PX+xsa1l/9gUxnbHfan72UYDvTfMj6rK/Bc6XpkvdhU4P7yPmlfi/HjD891e3hyPVHp+7+9OmlXkc6vLt9vu/P1F/6gPnboN5xSfqADwLUCFAjQI0ANQLUCFAjQC1/wOLwd8Lzppcr4E4IUCNAjQA1AtQIUCNAjQC1gQPk/8qsBg4oFsQNaxUbELer2cgBhYKwWe1CA8JWGQwdsCuIGmURGRC1yWTsgOVZAUGLjAYPWJ4UELPHbOB/aG6CADUC1AhQI0CNADUC1AhQewPBoJf1fW9pPwAAAABJRU5ErkJggg==";
</script>

<template>
  <div class="image-previews">
    <figure>
      <UIImage class="image" :src="source" alt="호수와 산" style="aspect-ratio: 1" />
      <figcaption>정사각형</figcaption>
    </figure>
    <figure>
      <UIImage class="image" :src="source" alt="호수와 산" style="aspect-ratio: 16 / 9" />
      <figcaption>가로형</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.image-previews {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ui-space-md);
}

.image-previews figure {
  margin: 0;
}

.image {
  inline-size: 9rem;
}
</style>
