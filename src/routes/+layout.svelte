<script lang="ts">
	import Navbar from '$lib/navbar/navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Navbar></Navbar>

{@render children()}
