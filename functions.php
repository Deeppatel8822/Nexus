<?php
if ( ! defined( 'ABSPATH' ) ) exit;

function nexus_global_exim_assets() {
    wp_enqueue_style(
        'nexus-google-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600&display=swap',
        array(),
        null
    );
    wp_enqueue_style(
        'nexus-global-exim',
        get_stylesheet_directory_uri() . '/style.css',
        array(),
        '1.0.0'
    );
    wp_enqueue_script(
        'nexus-global-exim',
        get_stylesheet_directory_uri() . '/assets/app.js',
        array(),
        '1.0.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'nexus_global_exim_assets' );

add_theme_support( 'title-tag' );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'custom-logo' );

function nexus_global_exim_wp_title( $title ) {
    if ( is_front_page() ) {
        return 'Nexus Global Exim — Indian Spices, Packaging & Chemicals Exporter';
    }
    return $title;
}
add_filter( 'pre_get_document_title', 'nexus_global_exim_wp_title' );
