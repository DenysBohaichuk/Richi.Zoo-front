<template>
  <div>
    <!-- Google Sign-In Button -->
    <div id="g_id_onload"
         :data-client_id="googleClientId"
         data-context="use"
         data-auto_prompt="false"
         data-callback="handleGoogleSignIn">
    </div>

    <div class="g_id_signin"
         data-type="standard"
         data-shape="pill"
         data-theme="outline"
         data-size="medium"
         data-locale="uk"
         data-logo_alignment="left">
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useAuth from '~~/server/services/user/auth/google/credentials.js'

const emits = defineEmits(['signInStart', 'signInComplete'])
const { user, handleCredentialResponse } = useAuth()
const googleClientId = useRuntimeConfig().public.GOOGLE_CLIENT_ID;

const handleGoogleSignIn = async (response) => {
  emits('signInStart');
  await handleCredentialResponse(response);
  emits('signInComplete');
};

onMounted(() => {
  window.handleGoogleSignIn = handleGoogleSignIn;

  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  document.head.appendChild(script)
})
</script>
