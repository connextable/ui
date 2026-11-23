<script setup lang="ts">
import { UIImage } from "@connextable/ui";

const small = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABACAMAAADS6oI8AAAAD1BMVEXe7vP3xIE6YXJlkZ+62d8qKlE0AAAAi0lEQVR4nO3OUQ6AIAwDUAbe/8waTUwQxkBoFG2/1745xzAM8/7IHvA8jhABC2hABCwQ+AHgxgN+iwIMWvcxYe8nFXs+LhT3lY55WfVUrqJ0sqdlQ6+kpdJt1jAKSantvuL6WqqvNAcOHAgY8AQIzAAEcAgQmB5YzhCwhNv73wdC7/7zQHcIEJgAWAHUAiWZnSM9jAAAAABJRU5ErkJggg==";
const large = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAACACAMAAABqWpZZAAAAD1BMVEXe7vP3xIE6YXJlkZ+62d8qKlE0AAABcklEQVR4nO3XwY6DMAxF0QLz/9/cSiyKSgKxceZhcs+2VfxuN6N5vQAAAAAAAKAwrdQznKYt9RiH6Yd6j9Hv/GwFhf2pCor7MxVUAtIU1PZnCajuz1Lw5IAUBUf7CfgPBKgRoJY+IP3fgUf/JVZPa5QkYK5+kmH/vKp8evf980b5G2H7D38nn3mn9K2I/edX7Pbra69f3d92JWh++XX/ftOZmPXlx8PX+xsa1l/9gUxnbHfan72UYDvTfMj6rK/Bc6XpkvdhU4P7yPmlfi/HjD891e3hyPVHp+7+9OmlXkc6vLt9vu/P1F/6gPnboN5xSfqADwLUCFAjQI0ANQLUCFAjQC1/wOLwd8Lzppcr4E4IUCNAjQA1AtQIUCNAjQC1gQPk/8qsBg4oFsQNaxUbELer2cgBhYKwWe1CA8JWGQwdsCuIGmURGRC1yWTsgOVZAUGLjAYPWJ4UELPHbOB/aG6CADUC1AhQI0CNADUC1AhQewPBoJf1fW9pPwAAAABJRU5ErkJggg==";
const candidates = `${small} 96w, ${large} 192w`;
</script>

<template>
  <UIImage
    class="responsive-image"
    :src="small"
    :srcset="candidates"
    sizes="(max-width: 42rem) 6rem, 12rem"
    alt="호수와 산 사이에 해가 떠 있는 풍경"
  />
</template>

<style scoped>
.responsive-image {
  inline-size: min(100%, 12rem);
  aspect-ratio: 3 / 2;
}

@media (width <= 42rem) {
  .responsive-image {
    inline-size: min(100%, 6rem);
  }
}
</style>
