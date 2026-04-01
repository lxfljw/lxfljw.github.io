<script setup lang="ts">
// VitePress「页眉」：layout-top 插槽，独立于默认导航栏（navbar）
// 与 theme/index.ts 中传入的 layout-top 对应
</script>

<template>
  <div class="vp-resume-site-header">
    <a
      class="vp-resume-site-header__link"
      href="https://luxiaofeng.site"
      target="_blank"
      rel="noopener noreferrer"
      >luxiaofeng.site</a
    >
  </div>
</template>

<style scoped>
.vp-resume-site-header {
  position: sticky;
  top: 0;
  z-index: calc(var(--vp-z-index-nav) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 16px;
  font-size: 13px;
  line-height: 1.4;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-alt);
}

.vp-resume-site-header__link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.vp-resume-site-header__link:hover {
  text-decoration: underline;
}
</style>
