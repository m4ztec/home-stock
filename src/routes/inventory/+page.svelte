<script lang="ts">

    import type { PageServerData } from './$types';
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox } from 'flowbite-svelte';
    
	let { data }: { data: PageServerData } = $props();
</script>
  
<form method="post" action="?/create">
	<label>
		Name
		<input name="name" />
	</label>
	<button>create inventory</button>
</form>
   
<Table hoverable={true}>
    <TableHead>
        <TableHeadCell class="!p-4">
        <Checkbox />
        </TableHeadCell>
        <TableHeadCell>inventory name</TableHeadCell>
        <TableHeadCell>
        <span class="sr-only">Edit</span>
        </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each data.inventories as inv}
        <TableBodyRow>
            <TableBodyCell class="!p-4">
                <Checkbox />
            </TableBodyCell>
            <TableBodyCell>{inv.inventory.name}</TableBodyCell>
            <TableBodyCell>
                <a href="/tables" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>
            </TableBodyCell>
        </TableBodyRow>
        {/each}
    </TableBody>
</Table>