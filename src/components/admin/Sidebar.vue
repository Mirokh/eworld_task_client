<template>
    <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
    >
        <v-list dense>
            <template v-for="item in items">
                <v-row
                        v-if="item.heading"
                        :key="item.heading"
                        align="center"
                >
                    <v-col cols="6">
                        <v-subheader v-if="item.heading">
                            {{ item.heading }}
                        </v-subheader>
                    </v-col>
                </v-row>
                <v-list-group
                        v-else-if="item.children"
                        :key="item.text"
                        color="blue-grey darken-4"
                        dark
                        v-model="item.model"
                        :prepend-icon="item.model ? item.icon : item['icon-alt']"
                        append-icon=""
                        :to="{name: item.to}"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                            v-for="(child, i) in item.children"
                            :key="i"
                            link
                            :to="{name: child.to}"
                            tag="span"
                    >
                        <v-list-item-action
                                class="ml-4"
                                            v-if="child.icon">
                            <v-icon size="17">{{ child.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ child.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <v-list-item
                        v-else
                        :key="item.text"
                        :to="{name: item.to}"
                        link
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Sidebar",
        data: () => ({
            items: [
                {
                    icon: 'fa-chevron-up',
                    'icon-alt': 'fa-chevron-down',
                    text: 'Products',
                    model: false,
                    children: [
                        {icon: 'fa-plus', text: 'Add product', to: 'products.add'},
                        {icon: 'fa-box-open', text: 'All products', to: 'products.all'},
                        {icon: 'fa-clone', text: 'Categories', to: 'categories'},
                    ],
                },
                {icon: 'fa-cog', text: 'Settings', to: 'admin.underConstruction'},
            ],
        }),
    }
</script>

