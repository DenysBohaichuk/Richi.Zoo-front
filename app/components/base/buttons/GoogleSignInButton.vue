<template>
  <div>
    <!-- Google Sign-In Button -->
    <div id="g_id_onload"
         :data-client_id="googleClientId"
         data-context="use"
         data-auto_prompt="true"
         data-callback="handleGoogleSignIn"
         data-use_fedcm_for_prompt="true">
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
import useAuth from '~/composables/api/services/user/auth/google/credentials.js'

const emits = defineEmits(['signInStart', 'signInComplete'])
const { user, handleCredentialResponse } = useAuth()
const googleClientId = useRuntimeConfig().public.GOOGLE_CLIENT_ID;
const formSubmitted = ref(false);

const handleGoogleSignIn = async (response) => {
  formSubmitted.value = true;

  emits('signInStart');
  try {
    await handleCredentialResponse(response);
    emits('signInComplete');
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    emits('signInComplete');
  }
  formSubmitted.value = false;
};

onMounted(() => {
  window.handleGoogleSignIn = handleGoogleSignIn;


  const initGoogleOneTap = () => {
    if (window.google && !user.value) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleSignIn,
        auto_select: true,
        context: 'use',
        use_fedcm_for_prompt: true
      })

      // Викликаємо One Tap вручну
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('One Tap не показаний або пропущений')
        }
      })
    }
  }

  // Чекаємо завантаження скрипта і запускаємо One Tap
  const checkGoogle = setInterval(() => {
    if (window.google) {
      clearInterval(checkGoogle)
      initGoogleOneTap()
    }
  }, 100)


  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  document.head.appendChild(script)

})

</script>
<style>
.g_id_signin > div > div:first-child{
  display: none;
}
.g_id_signin > div > div:last-child{
  display: none;
}

</style>