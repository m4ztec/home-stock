<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BigLogo</span>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/inventory">inventory</NavLi>
		<NavLi href="/wishlist">wishlist</NavLi>
		<NavLi href="/restock">restock</NavLi>
		<NavLi href="/login">Login</NavLi>
	</NavUl>
</Navbar>
